export const btnFormLogin = document.getElementById('btn-login');
export const inputCpfLogin = document.getElementById('login-cpf');
export const inputPassword = document.getElementById('login-password');
export const itemMsgAvisoLogin = document.querySelectorAll('.item-msg-aviso');
export const labelsLogin = document.getElementsByTagName('label');
export const icosLogin = document.getElementsByTagName('i');
export const formLogin = document.getElementById('form-login');
export const icoLock = document.getElementById('lock');


export const icoEye = document.getElementById('ico-eye');

function hasElements(){
    if(
        !btnFormLogin ||
        !inputCpfLogin ||
        !inputPassword ||
        !itemMsgAvisoLogin ||
        !labelsLogin ||
        !icosLogin ||
        !formLogin ||
        !icoEye||
        !icoLock
    ) return;


}

export { hasElements };