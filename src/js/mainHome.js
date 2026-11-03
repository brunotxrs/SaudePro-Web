import { btnCanceled, btnConfirmation, containerList, dateTime, icoStethoscope, nomeProfissional } from "./elementsDom.js";
import { loadingConsultas, loadingProfessional, updateStatusConsulta } from "./data.js";
import { btnDown, navigationByPage } from "./utils.js";


function medicType(param){
    let p ; 
    
    if(param.sexo === "Masculino"){
        p = 'Dr.';
        return p;
    } else {
        p = 'Dra.';
        return p;
    }
}

function adjustDate(param){
    const dataOld = new Date(param.data);
    if(!dataOld) return;
    let options = { day: 'numeric', month: 'short' };
    let dataFormatada = new Intl.DateTimeFormat('pt-BR', options).format(dataOld);
    let resultado = dataFormatada.replace('.', '');

    return resultado;
}

function checkingStatus(param) {

    if(param.status !== "Concluída" && param.status !== "Confirmada"){
        return `<i class="fa-solid fa-xmark" id="checking" style="color: red;"></i>`;
    } 

    return `<i class="fa-solid fa-check" id="checking"></i>`;
      
}

function applicationClass(element, paramAdd, paramRemove){
    element.classList.add(paramAdd);
    element.classList.remove(paramRemove);
}

function getDoctor(response, idSearch){
    const medico = response.find(medico => Number(medico.id) === idSearch);

    return medico
}


async function applyConsultas(){

    if(!dateTime || !nomeProfissional) return;

    // pegando o user pelo Storage
    const userString = sessionStorage.getItem('user');

    const userLogado = JSON.parse(userString);

    const respostaMedico = await loadingProfessional();
    if(!respostaMedico) return;
    const respostaConsulta = await loadingConsultas();
    if(!respostaConsulta) return;

    
    
    const userId = Number(userLogado.id);
    const consultaOrder = respostaConsulta.sort((a, b) => new Date(a.data) - new Date(b.data)).reverse();

    const consulta = consultaOrder.filter(c => c.pacienteId === userId && c.status === "Aberta");
    
    

    const notHasConsulta = () => {
        nomeProfissional.innerText = `Você não possui consultas agendadas no momento.`
        dateTime.innerText = ``;
        btnConfirmation.style.visibility = 'hidden'
        btnCanceled.style.visibility = 'hidden'
        icoStethoscope.classList.add('user-standard');
        document.querySelector('.box-calender').style.display = 'none'; 
    }
    

    if(consulta.length === 0){
        console.log('AQUI');
        notHasConsulta();

    } else {
        
        const consultaAtual = consulta[0];
        const consultaId = Number(consultaAtual.medicoId);
        const medico = getDoctor(respostaMedico, consultaId);

        nomeProfissional.innerText = `${medicType(medico)} ${medico.nome} - ${medico.area}`
        dateTime.innerText = `${adjustDate(consultaAtual)}, às ${consultaAtual.hora}`;
        

        // condição ternário para aplicar class background
        (medico.sexo === "Masculino")? 
        applicationClass(icoStethoscope, 'masc', 'feme') : 
        applicationClass(icoStethoscope, 'feme', 'masc')


        if(btnConfirmation){
            //aplicando novos estados apos o user
            btnConfirmation.onclick = async()=> {
                btnDown(btnConfirmation);
                updateStatusConsulta(consultaAtual.id, "Confirmada");
                containerList.innerHTML = '';
                applyConsultas();
            }
        }

        if(btnCanceled){
            btnCanceled.onclick = async() => {
                btnDown(btnCanceled);
                updateStatusConsulta(consultaAtual.id, "Cancelada");
                containerList.innerHTML = '';
                applyConsultas();
            }

        }


    
    }

    
    if(!containerList) return;
        
    // ordenando pela data atual pra antiga
    const consultaOrdenada = respostaConsulta.sort((a, b) => new Date(a.data) - new Date(b.data)).reverse();
    
    // buscando todas as consultas para histórico    
    consultaOrdenada.forEach((consulta) => {

        if(consulta.pacienteId === userId && consulta.status !== "Aberta"){
            const doctor = respostaMedico.find(medico => Number(medico.id) === Number(consulta.medicoId))
            const newList = document.createElement('li');

            newList.innerHTML = `
                    <span class="briefcase-medical"><i class="fa-solid fa-briefcase-medical" id="ico-fa-briefcase-medical"></i></span>
                    <div class="details">
                        <span id="professional">${medicType(doctor)} ${doctor.nome} - ${doctor.area}</span>
                        <span id="date"><i class="fa-solid fa-calendar-days"></i> ${adjustDate(consulta)} - ${consulta.hora}</span>
                    </div>
                    <div class="details-historic">
                        <span>${consulta.status}</span>
                        ${checkingStatus(consulta)}
                    </div>
            `
            
            containerList.appendChild(newList);
        }
        
    })

}

function actionsMainHome(){
    applyConsultas();
    
    if(!btnConfirmation || !btnCanceled) return;

    navigationByPage('btn-consultas', 'sec-consultas');
}

export { actionsMainHome };