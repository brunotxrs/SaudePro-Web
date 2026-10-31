import { applyAvisoMessage, applyAvisoClass, changeIcos } from '../js/utils.js'
import { btnFormLogin, formLogin, icoEye, icoLock, icosLogin, inputCpfLogin, inputPassword, itemMsgAvisoLogin, labelsLogin } from './elementsDom.js';

function toggleSenha() {
   
    const isOculto = inputPassword.type === 'password';

    if (isOculto) {
        inputPassword.type = 'text';
        changeIcos(icoEye, 'fa-eye-slash')
        changeIcos(icoEye, 'fa-eye')

    } else {
        inputPassword.type = 'password';
        changeIcos(icoEye, 'fa-eye-slash')
        changeIcos(icoEye, 'fa-eye')

    }
}


function inputSenhaChangeIcoClock(){

    inputPassword.addEventListener('input', (e) => {

        if(e.target.value !== ''){
            icoLock.classList.remove('fa-lock');
            icoLock.classList.add('fa-lock-open');

        } else if(e.target.value === '') {
            icoLock.classList.add('fa-lock');
            icoLock.classList.remove('fa-lock-open');
        }


    })


}


function listenForm(){
    
    if (formLogin) {
    
        formLogin.addEventListener('submit', (e) => {
    
            btnFormLogin.classList.add('btn-active');
    
            setTimeout(() => {
                btnFormLogin.classList.remove('btn-active');
            }, 1500)
    
            e.preventDefault(); // Impede o recarregamento
    
            if(inputCpfLogin.value === ''){
    
                itemMsgAvisoLogin.forEach((item, index) => {
                    if(index === 0) {
                        applyAvisoMessage(item, 'informe um CPF valido!');
                        applyAvisoClass(labelsLogin, 0, 'outline-aviso');
                        applyAvisoClass(icosLogin, 0, 'color-aviso');
                    }
                    
                })
                return
    
            }else if(inputPassword.value === ''){
                itemMsgAvisoLogin.forEach((item, index) => {
                    if(index === 1) {
    
                        applyAvisoMessage(item, 'informe uma Senha valido!');
                        applyAvisoClass(labelsLogin, 1, 'outline-aviso');
                        applyAvisoClass(icosLogin, 1, 'color-aviso');
                        applyAvisoClass(icosLogin, 2, 'color-aviso');
    
                    }
                    
                })
    
                return
            }
            
            formLogin.reset(); // Limpa os campos
        
        });
    }
}



function actionsLogin(){
    inputSenhaChangeIcoClock()
    listenForm()


    icoEye.addEventListener('click', () => {
        toggleSenha()
    })
}

export { actionsLogin };