const frm_login = document.getElementById("frm_login");

const txt_nome = document.getElementById("txt_nome");
const txt_login = document.getElementById("txt_login");
const txt_senha = document.getElementById("txt_senha");
const txt_confirmar_senha = document.getElementById("txt_confirmar_senha");

const btn_cadastrar = document.getElementById("btn_cadastrar");
const btn_limpar = document.getElementById("btn_limpar");

btn_limpar.addEventListener('click', () => {
    limparCampos();
});

frm_login.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = txt_nome.value.trim();
    const login = txt_login.value.trim();
    const senha = txt_senha.value.trim();
    const confirmar_senha = txt_confirmar_senha.value.trim();

    if (nome.length == 0) {
        notificarNok("É necessário digitar um nome para continuar!");
        txt_nome.focus();
        return false;
    }

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

    if (confirmar_senha.length == 0) {
        notificarNok("É necessário digitar uma confirmação de senha para continuar!");
        txt_confirmar_senha.focus();
        return false;
    }

    if (confirmar_senha != senha) {
        notificarNok("As senhas digitadas não conferem! Por favor, verifique a digitação das senhas e tente novamente.");
        txt_confirmar_senha.focus();
        return false;
    }

    const response = await fetch('/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, login, senha })
    });

    const result = await response.json();

    if (result.error) {
        notificarNok(result.error);
        return false;
    } else {
        notificarOk(result.message + " Redirecionando...");
        limparCampos();
        window.setTimeout(() => {
            window.open('./login.html', '_self');
        }, 5000);
    }
});

function limparCampos() {
    const nome = txt_nome.value.trim();
    const login = txt_login.value.trim();
    const senha = txt_senha.value.trim();
    const confirmar_senha = txt_confirmar_senha.value.trim();

    if (nome.length > 0 || login.length > 0 || senha.length > 0 || confirmar_senha.length > 0) {
        txt_nome.value = "";
        txt_login.value = "";
        txt_senha.value = "";
        txt_confirmar_senha.value = "";
        notificarOk("Campos limpos com sucesso.");
    }
}

txt_nome.focus();