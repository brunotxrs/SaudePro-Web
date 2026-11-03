import { containerNav } from "./elementsDom.js";

function applyAvisoMessage(item, message){
    item.innerText = message
   
    setTimeout(() => {
        item.innerText = '';
    },2000)

}

function applyAvisoClass(itemParam, index , classStyles){
    
    itemParam[index].classList.add(classStyles);
    
    setTimeout(() => {

        itemParam[index].classList.remove(classStyles);
        
    },2000)
}

function changeIcos(icoParam, classParam){
    icoParam.classList.toggle(classParam)
}

const maskCpf = ((event) => {
    let valor = event.target.value.replace(/\D/g, ''); // Remove tudo que não for número
    
    if (!valor) {
        event.target.value = "";
        return;
    }
    
    if (valor.length > 11) {
    valor = valor.slice(0, 11); // Limita a 11 dígitos
    }
    
    // Aplica a máscara do CPF (000.000.000-00)
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    event.target.value = valor;
})

function generateRandomPassword(length = 8) {
    // Define os caracteres permitidos (Maiúsculas, minúsculas, números e símbolos)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";
    
    let password = "";
    
    // Faz um loop para gerar cada caractere
    for (let i = 0; i < length; i++) {
        // Math.random() gera um número entre 0 e 1.
        // Multiplicamos pelo tamanho da string e usamos Math.floor para pegar o índice exato.
        const randomIndex = Math.floor(Math.random() * chars.length);
        
        // Pega o caractere do índice sorteado e adiciona na senha
        password += chars[randomIndex];
    }
    
    return password;
}

function spinner(){
    document.querySelector('.background-linear-gradient-spinner').classList.remove('hidden');

    setTimeout(() => {
        document.querySelector('.background-linear-gradient-spinner').classList.add('hidden');
    },2000)
}

function navigationByPage(paramBtn, paramAnc){

    const btn = document.getElementById(paramBtn)

    const sec = document.getElementById(paramAnc)

    if(!btn || !sec) return;

    if (btn && sec) {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o navegador de mudar a URL (e de recarregar)
            containerNav.classList.toggle('active-nav')
            // Rola a tela suavemente até a seção
            sec.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        });
    }
}

function btnDown(param){
    if(!param) return;
    
    param.classList.add('btn-clicked');


    param.addEventListener('mouseout', () => {
        param.classList.remove('btn-clicked');
    })
}


export { applyAvisoMessage, applyAvisoClass, changeIcos, maskCpf, generateRandomPassword, spinner, navigationByPage, btnDown };