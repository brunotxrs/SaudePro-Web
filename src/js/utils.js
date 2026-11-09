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

function removeNaveBarRight(){
    containerNav.classList.remove('active-nav');
    
}

function navigationByPage(paramBtn, paramAnc){

    const btn = document.getElementById(paramBtn)

    const sec = document.getElementById(paramAnc)

    if(!btn || !sec) return;

    if (btn && sec) {
        btn.addEventListener('click', (e) => {
            
            e.preventDefault(); // Impede o navegador de mudar a URL (e de recarregar)
            removeNaveBarRight()
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

function applicationClass(element, paramAdd, paramRemove){
    element.classList.add(paramAdd);
    element.classList.remove(paramRemove);
}


function applyHidden(paramBtn, paramAdd){
    const btn = document.getElementById(paramBtn);
    const add = document.querySelector(paramAdd);

    if(!btn || !add) return;

    btn.addEventListener('click', () => {
        add.classList.add('hidden');
    })
}

function removeSkeleton(){
    const tagElement = document.querySelectorAll('.skeleton');
    const tagVisibility = document.querySelectorAll('.elementVisibility');

    if(!tagElement || !tagVisibility) return;

    tagElement.forEach((ele) => {
        ele.classList.remove('skeleton')
        tagVisibility.forEach((v) => {
            v.classList.remove('elementVisibility');
        });
    })


}

function formatarParaDataDB(dataString){
    const meses = {
        "Janeiro": 0, "Fevereiro": 1, "Março": 2, "Abril": 3,
        "Maio": 4, "Junho": 5, "Julho": 6, "Agosto": 7,
        "Setembro": 8, "Outubro": 9, "Novembro": 10, "Dezembro": 11
    };


    const resposta = dataString.trim().replace(/\s+/g, '-')
    const [dia, nomeMes, ano] = resposta.split("-");
    
    // Pega o mês do objeto
    const mesIndex = meses[nomeMes]; 
    
    // Formata manualmente para YYYY-MM-DD (garantindo zero à esquerda)
    const diaFormatado = String(dia).padStart(2, '0');
    const mesFormatado = String(mesIndex + 1).padStart(2, '0');
    
    return `${ano}-${mesFormatado}-${diaFormatado}`;
}

function cleaningHtml(param){
    document.querySelector(param).innerHTML = '';
}


export { applyAvisoMessage, applyAvisoClass, changeIcos, maskCpf, generateRandomPassword, spinner, navigationByPage, btnDown, applicationClass, removeNaveBarRight, applyHidden, removeSkeleton, formatarParaDataDB, cleaningHtml };