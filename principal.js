const btn_sair = document.getElementById("btn_sair");

btn_sair.addEventListener('click', () => {
    localStorage.removeItem('usuario_logado');
    delCookie("usuario");
    notificarOk("Usuário deslogado com sucesso! Redirecionando...");
    window.setTimeout(() => {
        window.open('./login.html', '_self');
    }, 5000);
});

// console.log(localStorage.getItem('usuario_logado'));
// console.log(getCookie("usuario"));