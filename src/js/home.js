import { firstLetter, routeLogin, userName } from "./elementsDom.js";
import { actionsHeader } from '../js/headerHome.js';
import { actionsMainHome } from '../js/mainHome.js'


function helloUser(){
    if(!userName) return;

    const userString = sessionStorage.getItem('user');

    if(!userString){
        window.location.href = routeLogin;
        return;
    }


    const userLogado = JSON.parse(userString);

    userName.innerText = userLogado.nome;
    firstLetter.innerText = userLogado.nome[0];

    if(userLogado.sexo === 'Masculino'){
        firstLetter.classList.add('masc');
        firstLetter.classList.remove('feme');
        firstLetter.classList.remove('user-standard');
        return;
    } else if(userLogado.sexo === 'Feminino'){
        firstLetter.classList.remove('masc');
        firstLetter.classList.remove('user-standard');
        firstLetter.classList.add('feme');
        return;
    } else {
        firstLetter.classList.remove('masc');
        firstLetter.classList.remove('feme');
        firstLetter.classList.add('user-standard');
        return;
    }

}


function actionsHome (){
    actionsHeader();
    helloUser();
    actionsMainHome();
}

export { actionsHome };