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

export const containerList = document.querySelector('.container-details');

export const btnAgendamentos = document.getElementById('btn-agendamentos');


export const searchBox = document.querySelector('.search-box');
export const searchBtn = document.getElementById('search-Btn');
export const searchInput = document.querySelector('.search-input');
export const monthYearElement = document.getElementById('month-year');
export const calendarDaysElement = document.getElementById('calendar-days');
export const prevBtn = document.getElementById('prev-btn');
export const nextBtn = document.getElementById('next-btn');
export const listMedics = document.getElementById('list-medics');
export const boxTimes = document.getElementById('box-times');

export const monthYear = document.getElementById('month-year');
export const boxNewAgendamento = document.querySelector('.novoAgendamento');
export const btnConfirmAgendamento = document.getElementById('btn-confirm-agendamento');

export const btnTop = document.getElementById('btn-top');

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
        !containerList ||
        !btnAgendamentos ||
        !searchBox ||
        !searchBtn ||
        !searchInput ||
        !monthYearElement ||
        !calendarDaysElement ||
        !prevBtn ||
        !nextBtn ||
        !listMedics ||
        !boxTimes ||
        !monthYear ||
        !boxNewAgendamento ||
        !btnConfirmAgendamento ||
        !btnTop
    ) return;


}

export { hasElements };