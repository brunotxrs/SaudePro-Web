import { boxTimes, btnAgendamentos, btnCanceled, btnConfirmAgendamento, btnConfirmation, calendarDaysElement,  containerList, dateTime, hasElements, icoStethoscope, listMedics, monthYear, monthYearElement, nextBtn, nomeProfissional, prevBtn, searchBox, searchBtn, searchInput } from "./elementsDom.js";
import { addAgendamento, loadingConsultas, loadingProfessional, updateAgendamentosMedico, updateStatusConsulta } from "./data.js";
import { applyHidden, btnDown, cleaningHtml, formatarParaDataDB, navigationByPage, removeNaveBarRight, removeSkeleton } from "./utils.js";


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
    // Adiciona T00:00:00 para forçar o fuso horário local
    const dataString = param.data.includes('T') ? param.data : `${param.data}T00:00:00`;
    
    const dataOld = new Date(dataString);
    if(isNaN(dataOld)) return; // Verifica se a data é válida

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

    removeSkeleton(); // removendo um background de elementos vazio 
    
    const userId = Number(userLogado.id);
    
    // Filtra consultas abertas do usuário
    const consultaAberta = respostaConsulta
        .filter(c => Number(c.pacienteId) === userId && c.status === "Aberta")
        .sort((a, b) => new Date(a.data) - new Date(b.data))[0]; // Pega a primeira aberta

    const notHasConsulta = () => {
        nomeProfissional.innerText = `Você não possui consultas agendadas no momento.`
        dateTime.innerText = ``;
        btnConfirmation.style.visibility = 'hidden'
        btnCanceled.style.visibility = 'hidden'
        icoStethoscope.classList.add('user-standard');
        document.querySelector('.box-calender').style.display = 'none'; 
    }
    

    if(!consultaAberta){
        notHasConsulta();
        document.querySelector('.sub-box-ico').classList.add('hidden');
        document.querySelector('.box-buttons').classList.add('hidden');

    } else {
        document.querySelector('.sub-box-ico').classList.remove('hidden');
        document.querySelector('.box-buttons').classList.remove('hidden');
        //const consultaAtual = consulta[0];
        const consultaId = Number(consultaAberta.medicoId);
        const medico = getDoctor(respostaMedico, consultaId);

        // condição ternário para aplicar class background
        (medico.sexo === "Masculino")? 
        applicationClass(icoStethoscope, 'masc', 'feme') : 
        applicationClass(icoStethoscope, 'feme', 'masc')


        nomeProfissional.innerText = `${medicType(medico)} ${medico.nome} - ${medico.area}`
        dateTime.innerText = `${adjustDate(consultaAberta)}, às ${consultaAberta.hora}`;


        if(btnConfirmation){
            //aplicando novos estados apos o user
            btnConfirmation.onclick = async()=> {
                btnDown(btnConfirmation);
                await updateStatusConsulta(consultaAberta.id, "Confirmada");
                containerList.innerHTML = '';
                await applyConsultas();
            }
        }

        if(btnCanceled){
            btnCanceled.onclick = async() => {
                btnDown(btnCanceled);
                await updateStatusConsulta(consultaAberta.id, "Cancelada");
                containerList.innerHTML = '';
                await applyConsultas();
            }

        }
    
    }

    
    if(!containerList) return;
        
    // ordenando pela data atual pra antiga
    const consultaOrdenada = respostaConsulta.sort((a, b) => new Date(b.data) - new Date(a.data));
    
    // buscando todas as consultas para histórico    
    consultaOrdenada.forEach((consulta) => {

        if(Number(consulta.pacienteId) === userId && consulta.status !== "Aberta"){
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

async function searchView(){

    if(!searchBtn || !searchBox || !searchInput) return;

    // Ao clicar na lupa, ativa ou desativa a transição
    searchBtn.addEventListener('click', async(e) => {
      searchBox.classList.toggle('open');
      
        // Se abriu, joga o foco automaticamente para o teclado
        if (searchBox.classList.contains('open')) {
            searchInput.focus();

            const medicos = await loadingProfessional();

            searchInput.addEventListener('input', (e)=> {

                //console.log(e.target.value)
                const nomeMedic = e.target.value.trim();
                const areaMedic = e.target.value.trim();

                // busca pelo medico por duas condições
                const medico = medicos.filter(m => m.nome.toLowerCase() === nomeMedic.toLowerCase() || m.area.toLowerCase() === areaMedic.toLowerCase());

                // se input estiver vazio remove area de agendamento
                if(e.target.value === ''){
                    listMedics.classList.add('visibility');
                    cleaningHtml('#list-medics');
                    cleaningHtml('.novoAgendamento');
                    cleaningHtml('#box-times');
                    document.querySelector('.container-details-agendamento').classList.add('hidden');
                    
                }

                cleaningHtml('#list-medics');
                medico.forEach((m, i) => {
                    const li = document.createElement('li');
                    
                    li.id = `li-${i+1}`
                    li.innerText = `${medicType(m)} ${m.nome} - ${m.area}`
                    
                    listMedics.appendChild(li);
                    
                    const lis = document.getElementById(`li-${i+1}`)
                    
                    if(lis.textContent !== ""){
                        listMedics.classList.remove('visibility');
                    }
                    
                    const l = document.querySelectorAll('[id^="li-"]');

                    l.forEach((doctor, index) => {
                        doctor.onclick = () => {
                            const boxDescriptionDoctor = document.querySelector('.box-description-doctor');
                            
                            document.querySelector('.container-details-agendamento').classList.remove('hidden')
                            renderCalendar();
                            
                            boxDescriptionDoctor.innerHTML = ''
                            const h3 = document.createElement('h3');
                            h3.id = 'h3-info-doctor';
                            
                            h3.innerText = `${doctor.textContent}`;
                            
                            boxDescriptionDoctor.appendChild(h3);
                            
                            const selected = medico[index]; 
                            btnConfirmAgendamento.setAttribute('data-medico-id', selected.id)
                        }
                    })
                })
                
            })

        }
    });
    
    // Fecha se clicar fora da barra de pesquisa
    document.addEventListener('click', (e) => {
      if (!searchBox.contains(e.target)) {
        searchBox.classList.remove('open');
        cleaningHtml('#list-medics');
        listMedics.classList.add('visibility')
      }
    });
}


function handleDayClick(daySelect, monthIndex) {
    const mes = months[monthIndex]; 
    const diaMesAno = `${daySelect} ${monthYear.textContent}`;
    const dataParaDB = formatarParaDataDB(diaMesAno);
    
    // Pega o nome do médico que está na tela
    const doctorSelectedText = document.querySelector('.box-description-doctor h3').textContent;
    
    // Busca os dados do médico na API (você vai precisar carregar os dados novamente)
    loadingProfessional().then(medicos => {
        
        // Acha o médico pelo nome
        const medicoObj = medicos.find(m => doctorSelectedText.includes(m.nome));

        if (!medicoObj) return;

        let timesOcupados = [];

        // Verifica se o médico tem agendamentos no dia selecionado
        if (medicoObj.agendamentos && medicoObj.agendamentos[dataParaDB]) {
            timesOcupados = medicoObj.agendamentos[dataParaDB].reservas;
        }

        // Filtra os horários livres
        const timesFree = medicoObj.hora.filter(hora => !timesOcupados.includes(hora));

        // Limpa a boxTimes e adiciona os novos horários
        cleaningHtml('#box-times');

        timesFree.forEach(h => {
            const liTimes = document.createElement('li');
            liTimes.classList.add('timesForReserva');
            liTimes.innerText = h;
            boxTimes.appendChild(liTimes);

            // Adiciona o evento de clique no horário
            liTimes.onclick = () => {
                const hActive = document.querySelector('#box-times .timesForReserva.timeActive');
                if(hActive) hActive.classList.remove('timeActive');
                liTimes.classList.add('timeActive');

                const monthAdjust = mes.slice(0, 3);
                const newAgendamento = `${daySelect} de ${monthAdjust}, às ${h} - ${doctorSelectedText}`;

                const span = document.createElement('span');
                span.innerText = newAgendamento;
                const boxNewAgendamento = document.querySelector('.novoAgendamento');
                cleaningHtml('.novoAgendamento');
                boxNewAgendamento.appendChild(span);

                btnConfirmAgendamento.classList.remove('hidden')
            };
        });

    });


}


async function newAgendamento(){
    
    // pegando o user pelo Storage
    const userString = sessionStorage.getItem('user');

    const userLogado = JSON.parse(userString);

    const idPaciente = userLogado.id; // id do paciente


    // Pega o nome do médico que está na tela    
    // PEGA O ID DO MÉDICO DIRETO DO BOTÃO
    const idMedico = btnConfirmAgendamento.getAttribute('data-medico-id');

    if (!idMedico) {
        console.error("Médico não selecionado!");
        return;
    }

    //Pegando a data
    const diaSelecionado = document.querySelector('.today');
    if(!diaSelecionado) {
        console.log("Selecione um dia no calendário antes de confirmar.");
        return;
    }
    const dia = diaSelecionado.textContent;
    const stringDay = `${dia} ${monthYearElement.textContent}`;
    const dataForDB =  formatarParaDataDB(stringDay); // data

    console.log(`Dia pega no newAgendamento ${dia}`)

    // Pegando a hora
    const timeAtual = document.querySelector('.timeActive').textContent;
    
    const agendamentoResposta = await addAgendamento(idPaciente, idMedico, dataForDB, timeAtual);
    
    console.log("id do medico ", idMedico)

    if(agendamentoResposta){            
        await updateAgendamentosMedico(idMedico, dataForDB, timeAtual);
        
        
        btnConfirmAgendamento.innerHTML = `
            <i class="fa-solid fa-circle-check"></i> 
            Sucesso!
        `;
        btnConfirmAgendamento.classList.add('state-success');
        btnConfirmAgendamento.disabled = true; // Desabilita o clique

        cleaningHtml('.novoAgendamento');
        document.querySelector('.timeActive')?.classList.remove('timeActive');
        
        applyConsultas();

    } else {     
        // ver como resolvo UX aqui
        btnConfirmAgendamento.classList.add('state-error');

        setTimeout(() => {
        btnConfirmAgendamento.classList.remove('state-error');

        }, 3000)
        return
    }
    
}


function confirmandoNovoAgendamento(){

    if(!btnConfirmAgendamento)return;

    btnConfirmAgendamento.addEventListener('click', ()=> {
        newAgendamento();
    })
}


const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

let currentDate = new Date();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Define o texto do cabeçalho (Ex: "Novembro 2026")
    monthYearElement.innerText = `${months[month]} ${year}`;

    // Limpa os dias anteriores (usando sua função de limpar)
    cleaningHtml('#calendar-days');

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    // Preenche os espaços vazios iniciais
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('empty');
        calendarDaysElement.appendChild(emptyDiv);
    }

    // Pega a data atual e zera as horas (00:00:00) para comparar apenas o dia
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let day = 1; day <= lastDay; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('divs');
        dayDiv.innerText = day;

        // Cria a data do dia que está sendo renderizado e zera a hora
        const dateToCheck = new Date(year, month, day);
        dateToCheck.setHours(0, 0, 0, 0);

        // SÁBADO E DOMINGO
        const diaDaSemana = dateToCheck.getDay();
        const isWeekend = (diaDaSemana === 0 || diaDaSemana === 6); // 0 = Dom, 6 = Sáb

        // Se a data do calendário for MENOR que hoje, bloqueia
        if (dateToCheck < today || isWeekend) {
            dayDiv.classList.add('disabled');
            // Não adiciona nenhum evento de clique para dias passados
        } else {
            // Se for hoje ou futuro, adiciona o evento de clique
            dayDiv.addEventListener('click', () => {
                // Remove a seleção de qualquer outro dia
                const dayActive = document.querySelector('#calendar-days .divs.today');
                if (dayActive) {
                    dayActive.classList.remove('today','touch');
                }

                console.log(`Dia pega no renderCalender ${dayDiv.textContent}`)

                // Adiciona a classe de selecionado no dia clicado
                dayDiv.classList.add('today', 'touch');
                
                // Chama a sua função que preenche as horas
                handleDayClick(dayDiv.textContent, month);
            });
        }

        calendarDaysElement.appendChild(dayDiv);
    }
}

function actionsPrevBtnAndNexBtn(){
    if(!prevBtn || !nextBtn) return;

    // Eventos dos botões de navegação
    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

}

function actionBtnAgendamentos(){

    if(!btnAgendamentos)return;

    btnAgendamentos.addEventListener('click', (e)=> {
        e.preventDefault(); 

        removeNaveBarRight();
        
        document.querySelector('.container-nova-consulta').classList.toggle('hidden');
        
        navigationByPage('btn-agendamentos', 'sec-agendamentos');
    })
}

function actionsMainHome(){
    hasElements();
    actionBtnAgendamentos();
    actionsPrevBtnAndNexBtn();
    searchView();
    
    navigationByPage('btn-consultas', 'sec-consultas');
    
    applyHidden('btn-consultas', '.container-nova-consulta');
    
    applyConsultas();
    confirmandoNovoAgendamento();
    
}

export { actionsMainHome };