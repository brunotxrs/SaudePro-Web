import { applyAvisoMessage, applyAvisoClass, changeIcos, maskCpf, generateRandomPassword, spinner } from '../js/utils.js';
import { loadingData, updatePassword } from './data.js';
import { btnFormLogin, btnRecover, clickHere, formLogin, formRecover, icoEye, icoLock, icosLogin, inputCpfLogin, inputPassword, inputRecoverCpf, itemMsgAvisoLogin, labelsLogin, routeHome } from './elementsDom.js';

function checkingLoginByCpf(response, cpfClean){
    if(!response || response.length === 0) return false;
    const userFind = response.find(user => user.cpf === cpfClean);
    return userFind ? true : false;
}

function checkingLoginByPassword(response, cpfClean, passwordClean){
    if(!response || response.length === 0) return false;
    const userFind = response.find(user => user.cpf === cpfClean);
    if(!userFind) return false;
    return userFind.senha === passwordClean;

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

            const cpfClean = inputCpfLogin.value.replace(/\D/g, '');
            const senhaClean = inputPassword.value.trim();
            const respostas = await loadingData();

            if(!respostas){
                console.error('Erro ao consumir os dados ou nenhum usuário encontrado.');
                return;
            }
    
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
                const cpfValid = checkingLoginByCpf(respostas, cpfClean);

                if(!cpfValid){
                    itemMsgAvisoLogin.forEach((item, index) => {
                        if(index === 0) {
                            applyAvisoMessage(item, 'CPF não encontrado!');
                            applyAvisoClass(labelsLogin, 0, 'outline-aviso');
                            applyAvisoClass(icosLogin, 0, 'color-aviso');
                        }
                    });
                    return;
                }

                const validPassword = checkingLoginByPassword(respostas, cpfClean, senhaClean);

                if(!validPassword){
                    itemMsgAvisoLogin.forEach((item, index) => {
                        if(index === 1) {
                            applyAvisoMessage(item, 'Senha incorreta!');
                            applyAvisoClass(labelsLogin, 1, 'outline-aviso');
                            applyAvisoClass(icosLogin, 1, 'color-aviso');
                            applyAvisoClass(icosLogin, 2, 'color-aviso');
                        }
                    });
                    return;
                }
            }



            // reset icon block
            icoLock.classList.add('fa-lock');
            icoLock.classList.remove('fa-lock-open');

            // Saved in Session Storage
            const userFind = respostas.find(user => user.cpf === cpfClean);
            sessionStorage.setItem('user', JSON.stringify(userFind));

            formLogin.reset(); // Limpa os campos
            
            document.querySelector('.container-login').classList.add('hidden')
            
            spinner(); // Mostra o spinner de carregamento

            window.location.href = routeHome; // Redireciona para a página home.html

            setTimeout(() => {
                document.querySelector('.container-login').classList.remove('hidden')
            }, 2000)
            
        });
    }
}

function clickedHere(){

    clickHere.addEventListener('click', () => {
        console.log('clicou aqui');

        document.querySelector('.container-login').classList.add('hidden')
        document.querySelector('.background-linear-gradient-spinner').classList.remove('hidden');
        setTimeout(() => {

            document.querySelector('.background-linear-gradient-spinner').classList.add('hidden');
            document.querySelector('.container-recover-new-password').classList.remove('hidden');

        },2000)

    })
}

function listemInputRecoverPassword(){
    
    if(formRecover){
        formRecover.addEventListener('submit', async(e) => {
            e.preventDefault();

            btnRecover.classList.add('btn-active');

            const cpfClean = inputRecoverCpf.value.replace(/\D/g, '');
            const respostas = await loadingData();

            if(!respostas){
                console.error('Erro ao consumir os dados ou nenhum usuário encontrado.');
                return;
            }

            setTimeout(() => {
                
                btnRecover.classList.add('btn-active');

            },1500)

            if(inputRecoverCpf.value === ''){
    
                itemMsgAvisoLogin.forEach((item, index) => {
                    if(index === 2) {
                        applyAvisoMessage(item, 'informe um CPF valido!');
                        applyAvisoClass(labelsLogin, 2, 'outline-aviso');
                        applyAvisoClass(icosLogin, 3, 'color-aviso');
                    }
                    
                })
                return
    
            } else {
                
                const cpfValid = checkingLoginByCpf(respostas, cpfClean);
                
                if(!cpfValid){
                    itemMsgAvisoLogin.forEach((item, index) => {
                        if(index === 2) {
                            applyAvisoMessage(item, 'CPF não encontrado!');
                            applyAvisoClass(labelsLogin, 2, 'outline-aviso');
                            applyAvisoClass(icosLogin, 3, 'color-aviso');
                                                    
                        }
                    });
                    return;
                }

            }

            const email = respostas.find(user => user.cpf === cpfClean).email;

            //aplicar aqui a função de envio de email para o usuário com o cpf informado, usando o email encontrado no objeto do usuário.
            console.log(`Enviando email para ${email}...`);


            itemMsgAvisoLogin[2].style.fontWeight = 'bold';
            itemMsgAvisoLogin[2].style.color = '#0F4D0F';
            itemMsgAvisoLogin[2].innerText = 'Enviando email...';
            formRecover.reset()


            // Gerar senha aleatória
            const newPassword = generateRandomPassword(11);

            
            alert(`E-mail enviado para: ${email}\n\nSua senha provisória é: ${newPassword}\n\n(Em um sistema real, esta senha chegaria no seu e-mail.)`);

            // Atualizar a senha do usuário no banco de dados (simulado aqui)
            updatePassword(cpfClean, newPassword).then(() => {
                console.log('Senha atualizada com sucesso!');
                setTimeout(() => {window.location.reload()}, 1500)
            }).catch((error) => {
                console.error('Erro ao atualizar a senha:', error);
            });

        });

    }
}


function actionsLogin(){
    if(!inputCpfLogin) return;
    inputCpfLogin.addEventListener('input', maskCpf); // aplicando mascara de cpf
    inputRecoverCpf.addEventListener('input', maskCpf); // aplicando mascara de cpf
    
    inputSenhaChangeIcoClock();
    listenForm();

    icoEye.addEventListener('click', () => {
        toggleSenha()
    })

    clickedHere();
    listemInputRecoverPassword();


}

export { actionsLogin };