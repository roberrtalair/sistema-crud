const pg_login = true;

const txt_login = document.getElementById("txt_login");
const txt_senha = document.getElementById("txt_senha");
const btn_entrar = document.getElementById("btn_entrar");
const btn_limpar = document.getElementById("btn_limpar");
const div_notificacoes_ok = document.getElementById("div_notificacoes_ok");
const div_notificacoes_nok = document.getElementById("div_notificacoes_nok");
const frm_login = document.getElementById("frm_login");
const rdg_manter_conectado = document.getElementById("rdg_manter_conectado");
const rdg_salvar_senha = document.getElementById("rdg_salvar_senha");
const milisegundos_redirecionamento = 5000;

btn_limpar.addEventListener('click', () => {
    const login = txt_login.value.trim();
    const senha = txt_senha.value.trim();

    if (login.length > 0 || senha.length > 0) {
        txt_login.value = "";
        txt_senha.value = "";
        notificarOk("Campos limpos com sucesso.");
    }

    if (rdg_manter_conectado.checked || rdg_salvar_senha.checked) {
        rdg_manter_conectado.checked = false;
        rdg_salvar_senha.checked = false;
        notificarOk("Opções desmarcadas com sucesso.");
    }
});

frm_login.addEventListener('submit', async (e) => {
    e.preventDefault();
    // return false;
    const login = txt_login.value.trim();
    const senha = txt_senha.value.trim();

    if (login.length == 0) {
        notificarNok("É necessário digitar um login para continuar!");
        txt_login.focus();
        return false;
    }

    if (senha.length == 0) {
        notificarNok("É necessário digitar uma senha para continuar!");
        txt_senha.focus();
        return false;
    }

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, senha })
    });

    const result = await response.json();

    if (result.error) {
        notificarNok(result.error);
        // alert(result.error);
        return false;
    } else {
        notificarOk(result.message);
        localStorage.setItem('usuario_logado', result.id);
        if (rdg_manter_conectado.checked) {
            setCookie("usuario", result.id, 30);
        }
        window.setTimeout(() => {
            window.open('./principal.html', '_self');
        }, milisegundos_redirecionamento);
    }
});

/**
 * 
 * @param {cookie name} cname (nome do cookie)
 * @param {cookie value} cvalue (valor do cookie)
 * @param {expires days} exdays (dias para expirar o cookie: tem que avisar o usuário do tempo de permanência máxima de login no sistema)
 */
function setCookie(cname, cvalue, exdays) {
    // 1. Calcula a data de expiração
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();

    // 2. Cria a string do cookie com nome, valor e expiração
    // Adiciona 'path=/' para que o cookie esteja disponível em todo o domínio
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Cria um cookie chamado 'usuario' com o valor '0' que expira em 30 dias
//setCookie("usuario", "0", 30);

txt_login.focus();