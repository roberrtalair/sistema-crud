const frm_pesquisar = document.getElementById("frm_pesquisar");

const txt_id = document.getElementById("txt_id");
const txt_nome = document.getElementById("txt_nome");
const txt_login = document.getElementById("txt_login");
const txt_senha = document.getElementById("txt_senha");
const txt_confirma_senha = document.getElementById("txt_confirma_senha");
const txt_pesquisar = document.getElementById("txt_pesquisar");

const btn_pesquisar = document.getElementById("btn_pesquisar");
const btn_limpar = document.getElementById("btn_limpar");
const btn_apagar = document.getElementById("btn_apagar");

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
        txt_login.value = "";
        txt_senha.value = "";
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
        txt_login.value = result.login;
        txt_senha.value = result.senha;
    }
});

btn_apagar.addEventListener('click', async (e) => {
    e.preventDefault();

    if (confirm("Tem certeza de que quer cancelar? Lembrando que esta ação é irreversível e não será possível recuperar o registro excluído.") == false) {
        return false;
    }

    const id = txt_id.value.trim();

    const response = await fetch('/apagar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
    });

    const result = await response.json();

    if (result.error) {
        notificarNok(result.error);
    } else {
        notificarOk(result.message);
        carregarCampos();
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
        txt_login.value = result.rows[0].login;

        btn_primeiro.disabled = true;
        btn_anterior.disabled = true;
        btn_proximo.disabled = false;
        btn_ultimo.disabled = false;
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