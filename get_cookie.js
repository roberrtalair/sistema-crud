function delCookie(cname) {
    // Define a data de expiração para um momento no passado (por exemplo, 1º de janeiro de 1970)
    document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

/**
 * 
 * @param {cookie name} cname (nome do cookie)
 * @returns cookie value (if founded) - retorna o valor do cookie (se encontrado)
 */
function getCookie(cname) {
    // 1. Prepara a string de busca com o nome do cookie e o sinal de igual
    const name = cname + "=";

    // 2. Obtém a string completa de todos os cookies e a divide em um array
    // O trim() remove espaços em branco extras no início e fim
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    // 3. Itera sobre o array para encontrar o cookie desejado
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];

        // Remove espaços em branco no início do cookie
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }

        // Se a string do cookie começar com o nome que estamos procurando...
        if (c.indexOf(name) === 0) {
            // ... retorna o valor (tudo depois do sinal de igual)
            return c.substring(name.length, c.length);
        }
    }

    // 4. Se nenhum cookie com o nome for encontrado, retorna vazio
    return "";
}

const codUsuario = getCookie("usuario");
if (codUsuario !== "") {
    notificarOk("Bem-vindo de volta, " + codUsuario + "! Você será redirecionado para a página principal em " + (5000 / 1000) + " segundos.");
    window.setTimeout(() => {
        window.open('./principal.html', '_self');
    }, 5000);
} else {
    console.log("Nome do usuário não encontrado no cookie.");
}