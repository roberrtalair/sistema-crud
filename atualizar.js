const frm_pesquisar = document.getElementById("frm_pesquisar");

const txt_id = document.getElementById("txt_id");
const txt_nome = document.getElementById("txt_nome");
const txt_login = document.getElementById("txt_login");
const txt_senha = document.getElementById("txt_senha");
const txt_confirma_senha = document.getElementById("txt_confirma_senha");
const txt_pesquisar = document.getElementById("txt_pesquisar");

const hdn_nome_carregado = document.getElementById("hdn_nome_carregado");
const hdn_login_carregado = document.getElementById("hdn_login_carregado");
const hdn_senha_carregada = document.getElementById("hdn_senha_carregada");

const btn_pesquisar = document.getElementById("btn_pesquisar");
const btn_limpar = document.getElementById("btn_limpar");
const btn_atualizar = document.getElementById("btn_atualizar");

const btn_primeiro = document.getElementById("btn_primeiro");
const btn_anterior = document.getElementById("btn_anterior");
const btn_proximo = document.getElementById("btn_proximo");
const btn_ultimo = document.getElementById("btn_ultimo");

btn_limpar.addEventListener('click', () => {
    txt_pesquisar.value = "";
    btn_pesquisar.disabled = true;
    btn_limpar.disabled = true;
    txt_pesquisar.focus();
});

frm_pesquisar.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pesquisar = txt_pesquisar.value.trim();

    if (pesquisar.length == 0) {
        notificarNok("É necessário digitar algo para pesquisar!");
        txt_pesquisar.focus();
        return false;
    }

    const response = await fetch('/pesquisar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pesquisar })
    });

    const result = await response.json();

    if (result.error) {
        notificarNok(result.error);
        txt_id.value = "";

        txt_nome.value = "";
        hdn_nome_carregado.value = "";
        txt_login.value = "";
        hdn_login_carregado.value = "";
        txt_senha.value = "";
        hdn_senha_carregada.value = "";
        txt_confirma_senha.value = "";

        btn_primeiro.disabled = false;
        btn_anterior.disabled = true;
        btn_proximo.disabled = true;
        btn_ultimo.disabled = true;
        return false;
    } else {
        notificarOk(result.message);
        txt_id.value = result.id;
        txt_nome.value = result.nome;
        hdn_nome_carregado.value = result.nome;
        txt_login.value = result.login;
        hdn_login_carregado.value = result.login;
        txt_senha.value = result.senha;
        hdn_senha_carregada.value = result.senha;
    }
});

btn_atualizar.addEventListener('click', async (e) => {
    e.preventDefault();
    const id = txt_id.value.trim();
    var nome = txt_nome.value.trim();
    var login = txt_login.value.trim();
    var senha = txt_senha.value.trim();
    const confirma_senha = txt_confirma_senha.value.trim();

    const nome_carregado = hdn_nome_carregado.value.trim();
    const login_carregado = hdn_login_carregado.value.trim();
    const senha_carregada = hdn_senha_carregada.value.trim();

    if (nome.length == 0) {
        notificarNok("É necessário digitar um nome para atualizar!");
        txt_nome.focus();
        return false;
    }

    if (login.length == 0) {
        notificarNok("É necessário digitar um login para atualizar!");
        txt_login.focus();
        return false;
    }

    if (senha.length == 0) {
        notificarNok("É necessário digitar uma senha para atualizar!");
        txt_senha.focus();
        return false;
    } else {
        if (senha != confirma_senha) {
            notificarNok("As senhas não conferem! Verifique a digitação e tente novamente.");
            txt_confirma_senha.focus();
            return false;
        }
    }

    if (nome == nome_carregado) {
        nome = "";
    }

    if (login == login_carregado) {
        login = "";
    }

    if (senha == senha_carregada) {
        senha = "";
    }

    const response = await fetch('/atualizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, nome, login, senha })
    });

    const result = await response.json();

    if (result.error) {
        notificarNok(result.error);
    } else {
        notificarOk(result.message);
        btn_atualizar.disabled = true;
    }
});

async function carregarCampos() {
    const pesquisar = txt_pesquisar.value.trim();

    const response = await fetch('/atualizacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pesquisar })
    });

    const result = await response.json();

    if (result.error) {
        notificarNok(result.error);
    } else {
        notificarOk("Primeiro registro posicionado com sucesso!");

        txt_id.value = result.rows[0].id;
        txt_nome.value = result.rows[0].nome;
        hdn_nome_carregado.value = result.rows[0].nome;
        txt_login.value = result.rows[0].login;
        hdn_login_carregado.value = result.rows[0].login;

        btn_primeiro.disabled = true;
        btn_anterior.disabled = true;
        btn_atualizar.disabled = true;
    }
}

btn_primeiro.addEventListener('click', () => {
    carregarCampos();
    btn_proximo.disabled = false;
    btn_ultimo.disabled = false;
});

btn_anterior.addEventListener('click', async (e) => {
    e.preventDefault();
    const id = txt_id.value.trim();
    const pesquisar = txt_pesquisar.value.trim();

    const response = await fetch('/anterior', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, pesquisar })
    });

    const result = await response.json();

    if (result.error) {
        notificarNok("Não há registro anterior!");

        btn_primeiro.disabled = true;
        btn_anterior.disabled = true;
        btn_proximo.disabled = false;
        btn_ultimo.disabled = false;
    } else {
        notificarOk("Registro anterior posicionado com sucesso!");

        txt_id.value = result.id;
        txt_nome.value = result.nome;
        txt_login.value = result.login;

        btn_proximo.disabled = false;
        btn_ultimo.disabled = false;
    }
});

btn_proximo.addEventListener('click', async (e) => {
    e.preventDefault();
    const id = txt_id.value.trim();
    const pesquisar = txt_pesquisar.value.trim();

    const response = await fetch('/proximo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, pesquisar })
    });

    const result = await response.json();

    if (result.error) {
        notificarNok("Não há registro posterior!");
        btn_primeiro.disabled = false;
        btn_anterior.disabled = false;
        btn_proximo.disabled = true;
        btn_ultimo.disabled = true;
    } else {
        notificarOk("Registro posterior posicionado com sucesso!");

        txt_id.value = result.id;
        txt_nome.value = result.nome;
        txt_login.value = result.login;

        btn_primeiro.disabled = false;
        btn_anterior.disabled = false;
    }
});

btn_ultimo.addEventListener('click', async (e) => {
    e.preventDefault();
    const pesquisar = txt_pesquisar.value.trim();

    const response = await fetch('/ultimo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pesquisar })
    });

    const result = await response.json();

    if (result.error) {
        notificarNok("Não há registro posterior!");
    } else {
        notificarOk("Último registro posicionado com sucesso!");

        txt_id.value = result.id;
        txt_nome.value = result.nome;
        txt_login.value = result.login;

        btn_primeiro.disabled = false;
        btn_anterior.disabled = false;
        btn_ultimo.disabled = true;
        btn_proximo.disabled = true;
    }
});

function verificarCampos() {
    const nome = txt_nome.value.trim();
    const login = txt_login.value.trim();
    const senha = txt_senha.value.trim();

    const nome_carregado = hdn_nome_carregado.value.trim();
    const login_carregado = hdn_login_carregado.value.trim();
    const senha_carregada = hdn_senha_carregada.value.trim();

    if (nome != nome_carregado) {
        return false;
    }
    if (login != login_carregado) {
        return false;
    }
    if (senha.length > 0) {
        return false;
    }
    return true;
}

txt_nome.addEventListener('keyup', () => {
    if (verificarCampos() == false) {
        btn_atualizar.disabled = false;
    } else {
        btn_atualizar.disabled = true;
    }
});

txt_login.addEventListener('keyup', () => {
    if (verificarCampos() == false) {
        btn_atualizar.disabled = false;
    } else {
        btn_atualizar.disabled = true;
    }
});

txt_senha.addEventListener('keyup', () => {
    if (verificarCampos() == false) {
        btn_atualizar.disabled = false;
    } else {
        btn_atualizar.disabled = true;
    }
});

txt_pesquisar.addEventListener('keyup', () => {
    const pesquisa = txt_pesquisar.value.trim();
    if (pesquisa.length > 0) {
        btn_pesquisar.disabled = false;
        btn_limpar.disabled = false;
    } else {
        btn_pesquisar.disabled = true;
        btn_limpar.disabled = true;
    }
});

carregarCampos();
txt_pesquisar.focus();
btn_pesquisar.disabled = true;
btn_limpar.disabled = true;