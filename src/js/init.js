import { hasElements } from '../js/elementsDom.js'
import { actionsLogin } from '../js/login.js';


function init(){

    hasElements(); // pra confirmação de criação dos elementos no DOM

    actionsLogin();

}

export { init };