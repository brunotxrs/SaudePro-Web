import { hasElements, routeLogin } from './elementsDom.js'
import { actionsLogin } from './login.js';
import { actionsHome } from './home.js'




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