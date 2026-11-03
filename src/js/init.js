import { hasElements, routeLogin } from '../js/elementsDom.js'
import { actionsLogin } from '../js/login.js';
import { actionsHome } from '../js/home.js'




function init(){

    window.addEventListener('popstate', (event) => {
        // Se o usuário tentar voltar, limpa a sessão e joga ele pro login
        sessionStorage.removeItem('user');

        window.location.href = routeLogin;
    });


    hasElements(); // pra confirmação de criação dos elementos no DOM

    actionsLogin();

    actionsHome();

}

export { init };