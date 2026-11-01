import { applyAvisoMessage, applyAvisoClass, changeIcos, maskCpf } from '../js/utils.js';
import { loadingData } from './data.js';
import { btnFormLogin, formLogin, icoEye, icoLock, icosLogin, inputCpfLogin, inputPassword, itemMsgAvisoLogin, labelsLogin } from './elementsDom.js';

async function getDataUser(){

    try {
        
        const cpfClean = inputCpfLogin.value.replace(/\D/g, '');
        const senhaClean = inputPassword.value.trim();

        const respostas = await loadingData();


        // Verifica se a lista veio vazia ou deu erro
        if (!respostas || respostas.length === 0) {
            console.log("Nenhum usuário encontrado ou erro na busca.");
            return;
        }


        const userFind = respostas.find(user => user.cpf === cpfClean);

        if(!userFind){
            console.log("CPF não encontrado no banco.");
            return false;
        }


        if(userFind.senha !== senhaClean) {
            console.log("Senha incorreta.");
            return false;
        }

        // respostas.forEach(user => {

        //     if(user.cpf !== cpfClean){
        //         console.log("Nao ha usuario");

        //         return false;
        //     } 

        //     if(user.senha !== senhaClean) {
        //         console.log("Senha nao confere");

        //         return false;
        //     }

        //     console.log("Nome: " + user.nome)
        //     console.log("CPF: " + user.cpf)

        //     return true
        // })

        return true;

    } catch (error) {
        console.error('Erro ao consumir os dados:', error);
    }

}

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
        formLogin.addEventListener('submit', async(e) => {
            e.preventDefault(); // Impede o recarregamento
    
            btnFormLogin.classList.add('btn-active');
    
            setTimeout(() => {
                btnFormLogin.classList.remove('btn-active');
            }, 1500)
    
    
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
    
                return;
            } else {
                const validLogin = await getDataUser();

                if(!validLogin){
                    itemMsgAvisoLogin.forEach((item, index) => {
                        if(index === 0) {
                            applyAvisoMessage(item, 'CPF ou Senha incorretos!');
                            applyAvisoClass(labelsLogin, 0, 'outline-aviso');
                            applyAvisoClass(icosLogin, 0, 'color-aviso');
                        }
                    });
                    return;
                }
            }



            // reset icon block
            icoLock.classList.add('fa-lock');
            icoLock.classList.remove('fa-lock-open');

            formLogin.reset(); // Limpa os campos



        
        });
    }
}


function actionsLogin(){
    inputCpfLogin.addEventListener('input', maskCpf); // aplicando mascara de cpf
    
    inputSenhaChangeIcoClock();
    listenForm();

    icoEye.addEventListener('click', () => {
        toggleSenha()
    })


}

export { actionsLogin };