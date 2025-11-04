const div_polite = document.createElement('div');
div_polite.ariaLive = "polite";
div_polite.ariaAtomic = "true";
div_polite.classList.add("position-fixed");
div_polite.classList.add("bottom-0");
div_polite.classList.add("end-0");
div_polite.classList.add("p-3");
div_polite.style.zIndex = "1050";

const divNotificacoesOk = document.createElement('div');
divNotificacoesOk.id = "divNotificacoesOk";
divNotificacoesOk.classList.add("toast");
divNotificacoesOk.role = "alert";
divNotificacoesOk.ariaLive = "assertive";
divNotificacoesOk.ariaAtomic = "true";
// divNotificacoesOk.dataset.bsDelay = "5000";

const div_toast_header = document.createElement('div');
div_toast_header.classList.add("toast-header");

const strong_me_auto = document.createElement('strong');
strong_me_auto.classList.add("me-auto")
strong_me_auto.innerText = "Notificação Importante";

div_toast_header.appendChild(strong_me_auto);

const small_agora = document.createElement('small');
small_agora.innerText = "agora";

div_toast_header.appendChild(small_agora);

const btn_close = document.createElement('button');
btn_close.type = "button";
btn_close.classList.add("btn-close");
btn_close.dataset.bsDismiss = "toast";
btn_close.ariaLabel = "Fechar";

div_toast_header.appendChild(btn_close);

const div_toast_body = document.createElement('div');
div_toast_body.classList.add("toast-body");
div_toast_body.classList.add("alert");
div_toast_body.classList.add("mb-0");
div_toast_body.innerText = "Esta é a sua notificação flutuante fixa em Bootstrap 5.3!";

divNotificacoesOk.appendChild(div_toast_header);
divNotificacoesOk.appendChild(div_toast_body);

div_polite.appendChild(divNotificacoesOk);

document.body.appendChild(div_polite);

const toast = new bootstrap.Toast(divNotificacoesOk);
// toast.show();

/*
<div class="alert alert-success" id="div_notificacoes_ok" style="display: none;"></div>
<div class="alert alert-danger" id="div_notificacoes_nok" style="display: none;"></div>*/


function notificarOk(msg) {
    // div_notificacoes_nok.style.display = "none";
    // div_notificacoes_ok.innerText = msg;
    // div_notificacoes_ok.style.display = "block";
    // window.setTimeout(() => {
    //     div_notificacoes_ok.style.display = "none";
    // }, 5000);
    div_toast_body.classList.remove("alert-danger");
    div_toast_body.classList.add("alert-success");
    div_toast_body.innerText = msg;
    toast.show();
}

function notificarNok(msg) {
    // div_notificacoes_ok.style.display = "none";
    // div_notificacoes_nok.innerText = msg;
    // div_notificacoes_nok.style.display = "block";
    // window.setTimeout(() => {
    //     div_notificacoes_nok.style.display = "none";
    // }, 5000);
    div_toast_body.innerText = msg;
    toast.show();
    div_toast_body.classList.remove("alert-success");
    div_toast_body.classList.add("alert-danger");
}
