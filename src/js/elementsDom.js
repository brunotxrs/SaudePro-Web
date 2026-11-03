export const btnFormLogin = document.getElementById('btn-login');
export const inputCpfLogin = document.getElementById('login-cpf');
export const inputPassword = document.getElementById('login-password');
export const itemMsgAvisoLogin = document.querySelectorAll('.item-msg-aviso');
export const labelsLogin = document.getElementsByTagName('label');
export const icosLogin = document.getElementsByTagName('i');
export const formLogin = document.getElementById('form-login');
export const icoLock = document.getElementById('lock');
export const clickHere = document.getElementById('click-here');
export const icoEye = document.getElementById('ico-eye');
export const formRecover = document.getElementById('form-recover');
export const inputRecoverCpf = document.getElementById('recover-cpf');
export const btnRecover = document.getElementById('btn-recover');

export const routeHome = './src/html/home.html';
export const routeLogin = '../../index.html';
//------------------

//------------------
export const logout = document.getElementById('logout');
export const btnMenu = document.getElementById('ico-menu');
export const containerNav = document.querySelector('.container-nav');
export const btnTema = document.getElementById('ico-tema');
export const userName = document.getElementById('user-name');
export const firstLetter = document.querySelector('.first-letter');
export const nomeProfissional = document.getElementById('nome-profissional');
export const dateTime = document.getElementById('date-time');
export const icoStethoscope = document.querySelector('.ico-fa-stethoscope');
export const btnConfirmation = document.getElementById('confirmation');
export const btnCanceled = document.getElementById('canceled');
export const containerList = document.getElementById('sec-consultas');


function hasElements(){
    if(
        !btnFormLogin ||
        !inputCpfLogin ||
        !inputPassword ||
        !itemMsgAvisoLogin ||
        !labelsLogin ||
        !icosLogin ||
        !formLogin ||
        !icoEye ||
        !icoLock ||
        !clickHere ||
        !formRecover ||
        !inputRecoverCpf ||
        !btnRecover ||
        !routeHome ||
        !routeLogin ||
        !btnTema ||
        !logout ||
        !btnMenu ||
        !containerNav ||
        !userName ||
        !firstLetter ||
        !nomeProfissional ||
        !dateTime ||
        !icoStethoscope ||
        !btnConfirmation ||
        !btnCanceled ||
        !containerList
    ) return;


}

export { hasElements };