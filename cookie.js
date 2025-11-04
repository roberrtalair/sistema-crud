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
console.log(codUsuario);
if (codUsuario) {
    notificarOk("Bem-vindo de volta, " + codUsuario + "! Você será redirecionado para a página principal em " + (5000 / 1000) + " segundos.");
    window.setTimeout(() => {
        window.open('./principal.html', '_self');
    }, 5000);
} else {
    console.log("Nome do usuário não encontrado no cookie.");
}

/** ****************************************************** */

var divTermos = document.createElement("div");
divTermos.id = "politica";
divTermos.classList.add("politica-privacidade");
divTermos.classList.add("collapse");
divTermos.innerHTML = '<div class="d-flex justify-content-end sticky-top"><a class="btn btn-dark" role="button" onClick="document.getElementById("politica").classList.remove("show");" alt="Fechar janela"><li class="fa fa-close fa-2x"></li></a></div> De acordo com a Lei Geral de Proteção de Dados (<a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" target="_blank">LGPD</a>), temos todas as boas práticas de assegurar as políticas de segurança sobre todos os dados fornecidos pelo usuário e pelo servidor, as quais encontramos prudente obedecer conforme segue: <h2> <span id="Politica_de_Privacidade">Política de Privacidade</span> </h2> <p>Na <em>NOME COMPLETO DO SITE</em>, privacidade e segurança são prioridades e nos comprometemos com a transparência do tratamento de dados pessoais dos nossos usuários/clientes. Por isso, esta presente Política de Privacidade estabelece como é feita a coleta, uso e transferência de informações de clientes ou outras pessoas que acessam ou usam nosso site.</p> <p>Ao utilizar nossos serviços, você entende que coletaremos e usaremos suas informações pessoais nas formas descritas nesta Política, sob as normas da Constituição Federal de 1988 (art. 5º, LXXIX; e o art. 22º, XXX - incluídos pela EC 115/2022),<strong> </strong>das<strong> </strong>normas de Proteção de Dados (LGPD, Lei Federal 13.709/2018), das disposições consumeristas da Lei Federal 8078/1990 e as demais normas do ordenamento jurídico brasileiro aplicáveis.</p> <p>Dessa forma, a <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA</em>, doravante denominada simplesmente como “NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA”, inscrito(a) no CPF sob o nº <em>???.???.???-??</em> ou ou CNPJ/MF sob o nº <em>??.???.???/????-??</em>, no papel de Controladora de Dados, obriga-se ao disposto na presente Política de Privacidade.</p> <h3><span id="1_Quais_dados_coletamos_sobre_voce_e_para_qual_finalidade">1. Quais dados coletamos sobre você e para qual finalidade?</span></h3> <p>Nosso site coleta e utiliza alguns dados pessoais seus, de forma a viabilizar a prestação de serviços e aprimorar a experiência de uso.</p> <h4><span id="11_Dados_pessoais_fornecidos_pelo_titular">1.1. Dados pessoais fornecidos pelo titular</span></h4> <ul> <li><em>Nome completo para cadastro na loja.</em></li> <li><em>Email para cadastro na loja.</em></li> <li><em>RG para cadastro na loja.</em></li> <li><em>CPF para cadastro na loja.</em></li> <li><em>CNPJ para cadastro na loja.</em></li> <li><em>Endereço para cadastro na loja.</em></li> <li><em>Número de celular para cadastro na loja.</em></li> <li><em>Número de telefone fixo para cadastro na loja.</em></li> <li><em>Dados de cartão de crédito para pagamento de pedidos (tais dados são enviados automaticamente para a operadora (intermediadora) de pagamento, não ficando nenhuma informação de cartão de crédito salva no banco de dados da loja/site).</em></li> </ul> <h4><span id="12_Dados_pessoais_coletados_automaticamente">1.2. Dados pessoais coletados automaticamente</span> </h4> <ul> <li><em>Tamanho da tela, para configurar a acessibilidade de visualização.</em></li> <li><em>Informações do navegador (estilos css, atributos e características), para adaptatibilidade do layout do site.</em></li> </ul> <h3><span id="2_Como_coletamos_os_seus_dados">2. Como coletamos os seus dados?</span></h3> <p>Nesse sentido, a coleta dos seus dados pessoais ocorre da seguinte forma:</p> <ul> <li><em>Através de mecanismos, recursos e informações do navegador, via javascript.</em></li> <li><em>O usuário digita as informações ciente e voluntariamente nos campos de cadastro e pagamento.</em></li> </ul> <h4><span id="21_Consentimento">2.1. Consentimento</span></h4> <p>É a partir do seu consentimento que tratamos os seus dados pessoais. O consentimento é a manifestação livre, informada e inequívoca pela qual você autoriza a <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA</em> a tratar seus dados.</p> <p>Assim, em consonância com a Lei Geral de Proteção de Dados, seus dados só serão coletados, tratados e armazenados mediante prévio e expresso consentimento.</p> <p>O seu consentimento será obtido de forma específica para cada finalidade acima descrita, evidenciando o compromisso de transparência e boa-fé da <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA</em> para com seus usuários/clientes, seguindo as regulações legislativas pertinentes.</p> <p>Ao utilizar os serviços da <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA</em> e fornecer seus dados pessoais, você está ciente e consentindo com as disposições desta Política de Privacidade, além de conhecer seus direitos e como exercê-los.</p> <p>A qualquer tempo e sem nenhum custo, você poderá revogar seu consentimento.</p> <p>É importante destacar que a revogação do consentimento para o tratamento dos dados pode implicar a impossibilidade da performance adequada de alguma funcionalidade do site que dependa da operação. Tais consequências serão informadas previamente.</p> <h3><span id="3_Quais_sao_os_seus_direitos">3. Quais são os seus direitos?</span></h3> <p>A <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA</em> assegura a seus usuários/clientes seus direitos de titular previstos no artigo 18 da Lei Geral de Proteção de Dados. Dessa forma, você pode, de maneira gratuita e a qualquer tempo:</p> <ul> <li><strong>Confirmar a existência de tratamento de dados</strong>, de maneira simplificada ou em formato claro e completo.</li> <li><strong>Acessar seus dados</strong>, podendo solicitá-los em uma cópia legível sob forma impressa ou por meio eletrônico, seguro e idôneo.</li> <li><strong>Corrigir seus dados</strong>, ao solicitar a edição, correção ou atualização destes.</li> <li><strong>Limitar seus dados</strong> quando desnecessários, excessivos ou tratados em desconformidade com a legislação através da anonimização, bloqueio ou eliminação.</li> <li><strong>Solicitar a portabilidade de seus dados</strong>, através de um relatório de dados cadastrais que a <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA</em> trata a seu respeito.</li> <li><strong>Eliminar seus dados</strong> tratados a partir de seu consentimento, exceto nos casos previstos em lei.</li> <li><strong>Revogar seu consentimento</strong>, desautorizando o tratamento de seus dados.</li> <li><strong>Informar-se sobre a possibilidade de não fornecer seu consentimento</strong> e sobre as consequências da negativa.</li> </ul> <h3><span id="4_Como_voce_pode_exercer_seus_direitos_de_titular">4. Como você pode exercer seus direitos de titular?</span></h3> <p>Para exercer seus direitos de titular, você deve entrar em contato com a <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA</em> através dos seguintes meios disponíveis:</p> <ul> <li><em>Meio de contato</em></li> <li><em>Meio de contato</em></li> </ul> <p>De forma a garantir a sua correta identificação como titular dos dados pessoais objeto da solicitação, é possível que solicitemos documentos ou demais comprovações que possam comprovar sua identidade. Nessa hipótese, você será informado previamente.</p> <h3><span id="5_Como_e_por_quanto_tempo_seus_dados_serao_armazenados">5. Como e por quanto tempo seus dados serão armazenados?</span></h3> <p>Seus dados pessoais coletados pela <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA</em> serão utilizados e armazenados durante o tempo necessário para a prestação do serviço ou para que as finalidades elencadas na presente Política de Privacidade sejam atingidas, considerando os direitos dos titulares dos dados e dos controladores.</p> <p>De modo geral, seus dados serão mantidos enquanto a relação contratual entre você e a <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA</em> perdurar. Findado o período de armazenamento dos dados pessoais, estes serão excluídos de nossas bases de dados ou anonimizados, ressalvadas as hipóteses legalmente previstas no artigo 16 lei geral de proteção de dados, a saber:</p> <p>I - cumprimento de obrigação legal ou regulatória pelo controlador;</p> <p>II - estudo por órgão de pesquisa, garantida, sempre que possível, a anonimização dos dados pessoais;</p> <p>III - transferência a terceiro, desde que respeitados os requisitos de tratamento de dados dispostos nesta Lei; ou</p> <p>IV - uso exclusivo do controlador, vedado seu acesso por terceiro, e desde que anonimizados os dados.</p> <p>Isto é, informações pessoais sobre você que sejam imprescindíveis para o cumprimento de determinações legais, judiciais e administrativas e/ou para o exercício do direito de defesa em processos judiciais e administrativos serão mantidas, a despeito da exclusão dos demais dados.</p> <p>O armazenamento de dados coletados pela <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA</em> reflete o nosso compromisso com a segurança e privacidade dos seus dados. Empregamos medidas e soluções técnicas de proteção aptas a garantir a confidencialidade, integridade e inviolabilidade dos seus dados. Além disso, também contamos com medidas de segurança apropriadas aos riscos e com controle de acesso às informações armazenadas.</p> <h3><span id="6_O_que_fazemos_para_manter_seus_dados_seguros">6. O que fazemos para manter seus dados seguros?</span></h3> <p>Para mantermos suas informações pessoais seguras, usamos ferramentas físicas, eletrônicas e gerenciais orientadas para a proteção da sua privacidade.</p> <p>Aplicamos essas ferramentas levando em consideração a natureza dos dados pessoais coletados, o contexto e a finalidade do tratamento e os riscos que eventuais violações gerariam para os direitos e liberdades do titular dos dados coletados e tratados.</p> <p>Entre as medidas que adotamos, destacamos as seguintes:</p> <ul> <li>Apenas pessoas autorizadas têm acesso a seus dados pessoais</li> <li>O acesso a seus dados pessoais é feito somente após o compromisso de confidencialidade</li> <li>Seus dados pessoais são armazenados em ambiente seguro e idôneo.</li> </ul> <p>A <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA</em> se compromete a adotar as melhores posturas para evitar incidentes de segurança. Contudo, é necessário destacar que nenhuma página virtual é inteiramente segura e livre de riscos. É possível que, apesar de todos os nossos protocolos de segurança, problemas de culpa exclusivamente de terceiros ocorram, como ataques cibernéticos de <em>hackers</em>, ou também em decorrência da negligência ou imprudência do próprio usuário/cliente.</p> <p>Em caso de incidentes de segurança que possa gerar risco ou dano relevante para você ou qualquer um de nossos usuários/clientes, comunicaremos aos afetados e a Autoridade Nacional de Proteção de Dados sobre o ocorrido, em consonância com as disposições da Lei Geral de Proteção de Dados.</p> <h3><span id="7_Com_quem_seus_dados_podem_ser_compartilhados">7. Com quem seus dados podem ser compartilhados?</span></h3> <p>Tendo em vista a preservação de sua privacidade, a <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA</em> não compartilhará seus dados pessoais com nenhum terceiro não autorizado.</p> <p><em>Seus dados poderão ser compartilhados com nossos parceiros comerciais (mediante prévia autorização de ambos).</em> </p> <p><em>Estes recebem seus dados apenas na medida do necessário para a prestação dos serviços contratados e nossos contratos são orientados pelas normas de proteção de dados do ordenamento jurídico brasileiro.</em></p> <p><em>Todavia, nossos parceiros têm suas próprias Políticas de Privacidade, que podem divergir desta. Recomendamos a leitura desses documentos, que você pode acessar aqui:</em></p> <p>Além disso, também existem outras hipóteses em que seus dados poderão ser compartilhados, que são:</p> <p>I - Determinação legal, requerimento, requisição ou ordem judicial, com autoridades judiciais, administrativas ou governamentais competentes.</p> <p>II - Caso de movimentações societárias, como fusão, aquisição e incorporação, de forma automática</p> <p>III - Proteção dos direitos da <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA</em> em qualquer tipo de conflito, inclusive os de teor judicial.</p> <h4><span id="71_Transferencia_internacional_de_dados">7.1. Transferência internacional de dados</span></h4> <p>Alguns dos terceiros com quem compartilhamos seus dados podem ser localizados ou ou possuir instalações localizadas em países estrangeiros. Nessas condições, de toda forma, seus dados pessoais estarão sujeitos à Lei Geral de Proteção de Dados e às demais legislações brasileiras de proteção de dados</p> <p>Nesse sentido, a <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA</em> se compromete a sempre adotar eficientes padrões de segurança cibernética e de proteção de dados, nos melhores esforços de garantir e cumprir as exigências legislativas.</p> <p>Ao concordar com essa Política de Privacidade, você concorda com esse compartilhamento, que se dará conforme as finalidades descritas no presente instrumento.</p> <h3><span id="8_Cookies_ou_dados_de_navegacao">8. Cookies ou dados de navegação</span></h3> <p>A <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA</em> faz uso de Cookies, que são arquivos de texto enviados pela plataforma ao seu computador e que nele se armazenam, que contém informações relacionadas à navegação do site. Em suma, os Cookies são utilizados para aprimorar a experiência de uso.</p> <p>Ao acessar nosso site e consentir com o uso de Cookies, você manifesta conhecer e aceitar a utilização de um sistema de coleta de dados de navegação com o uso de Cookies em seu dispositivo.</p> <p><em>A NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA utiliza os seguintes Cookies: <strong>(pureCookieDismiss e demais atributos).</strong></em></p> <p>Você pode, a qualquer tempo e sem nenhum custo, alterar as permissões, bloquear ou recusar os Cookies. Todavia, a revogação do consentimento de determinados Cookies pode inviabilizar o funcionamento correto de alguns recursos da plataforma.</p> <p>Para gerenciar os cookies do seu navegador, basta fazê-lo diretamente nas configurações do navegador, na área de gestão de Cookies. Você pode acessar tutoriais sobre o tema diretamente nos links abaixo:</p> <p>Se você usa o <a href="https://support.microsoft.com/pt-br/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener">Internet Explorer</a>.</p> <p>Se você usa o <a href="https://support.mozilla.org/pt-BR/kb/gerencie-configuracoes-de-armazenamento-local-de-s" target="_blank" rel="noopener">Firefox</a>.</p> <p>Se você usa o <a href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a>.</p> <p>Se você usa o <a href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&amp;oco=1&amp;hl=pt-BR" target="_blank" rel="noopener">Google Chrome</a>.</p> <p>Se você usa o <a href="https://support.microsoft.com/pt-br/help/4027947/microsoft-edge-delete-cookies" target="_blank" rel="noopener">Microsoft Edge</a>.</p> <p>Se você usa o <a href="https://help.opera.com/en/latest/web-preferences/#cookies" target="_blank" rel="noopener">Opera</a>.</p> <p>Você pode ter maiores informações sobre os Cookies que utilizamos e como eles funcionam na nossa Política de Cookies, disponível neste link <em>(link para a Política de Cookies)</em>.</p> <h3><span id="9_Alteracao_desta_Politica_de_Privacidade">9. Alteração desta Política de Privacidade</span></h3> <p>A atual versão da Política de Privacidade foi formulada e atualizada pela última vez em: <em>23/02/2023</em>.</p> <p>Reservamos o direito de modificar essa Política de Privacidade a qualquer tempo, principalmente em função da adequação a eventuais alterações feitas em nosso site ou em âmbito legislativo. Recomendamos que você a revise com frequência.</p> <p>Eventuais alterações entrarão em vigor a partir de sua publicação em nosso site e sempre lhe notificaremos acerca das mudanças ocorridas.</p> <p>Ao utilizar nossos serviços e fornecer seus dados pessoais após tais modificações, você as consente.</p> <h3><span id="10_Responsabilidade">10. Responsabilidade</span></h3> <p>A <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA </em>prevê a responsabilidade dos agentes que atuam nos processos de tratamento de dados, em conformidade com os artigos 42 ao 45 da Lei Geral de Proteção de Dados.</p> <p>Nos comprometemos em manter esta Política de Privacidade atualizada, observando suas disposições e zelando por seu cumprimento.</p> <p>Além disso, também assumimos o compromisso de buscar condições técnicas e organizativas seguramente aptas a proteger todo o processo de tratamento de dados.</p> <p>Caso a Autoridade Nacional de Proteção de Dados exija a adoção de providências em relação ao tratamento de dados realizado pela <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA, </em>comprometemo-nos a segui-las.</p> <h4><span id="101_Isencao_de_responsabilidade">10.1 Isenção de responsabilidade</span></h4> <p>Conforme mencionado no Tópico 6, embora adotemos elevados padrões de segurança a fim de evitar incidentes, não há nenhuma página virtual inteiramente livre de riscos. Nesse sentido, a <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA</em> não se responsabiliza por:</p> <p>I - Quaisquer consequências decorrentes da negligência, imprudência ou imperícia dos usuários em relação a seus dados individuais. Garantimos e nos responsabilizamos apenas pela segurança dos processos de tratamento de dados e do cumprimento das finalidades descritas no presente instrumento.</p> <p>Destacamos que a responsabilidade em relação à confidencialidade dos dados de acesso é do usuário.</p> <p>II - Ações maliciosas de terceiros, como ataques de <em>hackers</em>, exceto se comprovada conduta culposa ou deliberada da <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA.</em></p> <p>Destacamos que em caso de incidentes de segurança que possam gerar risco ou dano relevante para você ou qualquer um de nossos usuários/clientes, comunicaremos aos afetados e a Autoridade Nacional de Proteção de Dados sobre o ocorrido e cumpriremos as providências necessárias.</p> <p>III - Inveracidade das informações inseridas pelo usuário/cliente nos registros necessários para a utilização dos serviços da <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA</em>; quaisquer consequências decorrentes de informações falsas ou inseridas de má-fé são de inteiramente responsabilidade do usuário/cliente.</p> <h3><span id="11_Encarregado_de_Protecao_de_Dados">11. Encarregado de Proteção de Dados</span></h3> <p>A <em>NOME COMPLETO DO RESPONSÁVEL PELO SITE/SISTEMA</em> disponibiliza os seguintes meios para que você possa entrar em contato conosco para exercer seus direitos de titular: <em>(meios de contato)</em>.</p> <p>Caso tenha dúvidas sobre esta Política de Privacidade ou sobre os dados pessoais que tratamos, você pode entrar em contato com o nosso Encarregado de Proteção de Dados Pessoais, através dos seguintes canais:</p> <p><em>NOME COMPLETO DO RESPONSÁVEL PELA REDAÇÃO DOS TERMOS LEGAIS ACIMA (normalmente é um advogado)</em></p> <p><em>email@de.contato</em></p>';

document.body.appendChild(divTermos);

var divConsent = document.createElement("div");
divConsent.id = "cookieConsentContainer";
divConsent.classList.add("cookieConsentContainer");
divConsent.style.display = "none";
divConsent.innerHTML = '<div class="cookieTitle"> <b class="text-white">Nossos cookies estão atualizados! @2025</b> </div> <div class="cookieDesc"> <p> Ao usar este site, você automaticamente aceita que seu computador utilize os cookies em seu navegador, para melhorar sua experiência de navegação em todas as páginas. <a href="#politica" data-bs-toggle="collapse" data-bs-target="#politica" aria-expanded="false" aria-controls="politica">Saiba mais</a> </p> </div> <div class="cookieButton"> <a onClick="purecookieDismiss();">Entendido</a> </div>';

document.body.appendChild(divConsent);

/**
 * function pureFadeIn(e,o){var i=document.getElementById(e);i.style.opacity=0,i.style.display=o||"block",function e(){var o=parseFloat(i.style.opacity);(o+=.02)>1||(i.style.opacity=o,requestAnimationFrame(e))}()}
 */
function pureFadeIn(e,o) {
    var i = document.getElementById(e);
    i.style.opacity = 0,
    i.style.display = o || "block",

    function e() {
        var o = parseFloat(i.style.opacity);
        (o += .02) > 1 || (
            i.style.opacity = o,
            requestAnimationFrame(e)
        );
    }();
};

/**
 * function pureFadeOut(e){var o=document.getElementById(e);o.style.opacity=1,function e(){(o.style.opacity-=.02)<0?o.style.display="none":requestAnimationFrame(e)}()}
 */
function pureFadeOut(e) {
    var o = document.getElementById(e);
    o.style.opacity = 1,
    function e() {
        (o.style.opacity -= .02) < 0 ? o.style.display="none" : requestAnimationFrame(e)
    }();
};

/**
 * function setCookie(e,o,i){var t="";if(i){var n=new Date;n.setTime(n.getTime()+24*i*60*60*1e3),t="; expires="+n.toUTCString()}document.cookie=e+"="+(o||"")+t+"; path=/"}
 */
function setCookie(e,o,i) {
    var t = "";
    if (i) {
        var n = new Date;
        n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3),
        t = "; expires=" + n.toUTCString()
    }
    document.cookie = e + "=" + (o || "") + t + "; path=/";
};

/**
 * function getCookie(e){for(var o=e+"=",i=document.cookie.split(";"),t=0;t<i.length;t++){for(var n=i[t];" "==n.charAt(0);)n=n.substring(1,n.length);if(0==n.indexOf(o))return n.substring(o.length,n.length)}return null}
 */
function getCookie(e) {
    for (var o = e + "=", i = document.cookie.split(";"), t = 0; t < i.length; t++) {
        for (var n = i[t]; " " == n.charAt(0);) n = n.substring(1,n.length);
        if (0 == n.indexOf(o)) return n.substring(o.length,n.length);
    }
    return null;
};

/**
 * function eraseCookie(e){document.cookie=e+"=; Max-Age=-99999999;"}
 */
function eraseCookie(e) {
    document.cookie = e + "=; Max-Age=-99999999;";
};

/**
 * function cookieConsent(){getCookie("purecookieDismiss")||(document.body.innerHTML+='<div class="cookieConsentContainer" id="cookieConsentContainer"><div class="cookieTitle"><a>'+purecookieTitle+'</a></div><div class="cookieDesc"><p>'+purecookieDesc+" "+purecookieLink+'</p></div><div class="cookieButton"><a onClick="purecookieDismiss();">'+purecookieButton+"</a></div></div>",pureFadeIn("cookieConsentContainer"))}
 */
function cookieConsent() {
    getCookie("purecookieDismiss") || (
        document.getElementById('cookieConsentContainer').style.display = "block",
        pureFadeIn("cookieConsentContainer")
    );
};

/**
 * function purecookieDismiss(){setCookie("purecookieDismiss","1",7),pureFadeOut("cookieConsentContainer")}
 */
function purecookieDismiss() {
    setCookie("purecookieDismiss", "1", 7),
    pureFadeOut("cookieConsentContainer");
    document.getElementById('politica').classList.remove('show');
};

/**
 * window.onload=function(){cookieConsent()};
 */
window.onload = () => {
    cookieConsent();
};