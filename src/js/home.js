import { btnTop, firstLetter, routeLogin, userName } from "./elementsDom.js";
import { actionsHeader } from './headerHome.js';
import { actionsMainHome } from './mainHome.js';
import { applicationClass, navigationByPage, removeNaveBarRight } from "./utils.js";


function utilScrollToTop() {
 
    function verificarRolagem() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if (scrollTop > 20) {
            btnTop.classList.remove('hidden', );
        } else {
            btnTop.classList.add('hidden');
            btnTop.classList.remove('animando-btn-top')
        }
    }

    window.addEventListener("scroll", verificarRolagem);


    if(!btnTop) return;

    btnTop.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
        btnTop.classList.add('animando-btn-top')

    });

    verificarRolagem();
}


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
        firstLetter.classList.remove('user-standard');
        applicationClass(firstLetter, 'masc', 'feme');
        return;
    } else if(userLogado.sexo === 'Feminino'){
        firstLetter.classList.remove('user-standard');
        applicationClass(firstLetter, 'feme', 'masc');
        return;
    } else {
        firstLetter.classList.remove('feme');
        applicationClass(firstLetter, 'user-standard', 'masc');
        return;
    }

}


const closNav = document.querySelectorAll('.forNav');
closNav.forEach((corpo) => {
    corpo.addEventListener('mouseenter', () => {
        removeNaveBarRight();
    })
})

function actionsHome (){
    actionsHeader();
    helloUser();
    actionsMainHome();

    navigationByPage('btn-contato', 'sec-contato');

    utilScrollToTop()
}

export { actionsHome };