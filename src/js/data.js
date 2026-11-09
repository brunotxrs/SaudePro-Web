const urlApi = 'http://localhost:3000/';


async function loadingData() {

    try {

        const response = await fetch(`${urlApi}pacientes`);

        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const dados = await response.json();

        return dados;
        
    } catch (error) {
        console.error('Ocorreu um erro ao carregar o JSON:', error);
    }
    
}

async function updatePassword(cpf, newPassword) {
     try {

        const response = await fetch(`${urlApi}pacientes`);

        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const dados = await response.json();

        const userToUpdate = dados.find(user => user.cpf === cpf);
        
        if (!userToUpdate) {
            throw new Error('Usuário não encontrado.');
        }

        userToUpdate.senha = newPassword;

        const updateResponse = await fetch(`${urlApi}pacientes/${userToUpdate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userToUpdate)
        });

        if (!updateResponse.ok) {
            throw new Error(`Erro ao atualizar a senha: ${updateResponse.status}`);
        }


    } catch (error) {
        console.error('Ocorreu um erro ao carregar o JSON:', error);
    }
}

async function loadingProfessional() {
    try {
        
        const response = await fetch(`${urlApi}medicos`)

        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const dados  = await response.json();

        return dados;

    } catch (error) {
        console.error('Ocorreu um erro ao carregar o JSON:', error);
    }
}

async function updateAgendamentosMedico(idMedic, dataAgendada, horaAgendada){

    try {

        const responseMedic = await fetch(`${urlApi}medicos/${idMedic}`)

        if(!responseMedic.ok) throw new Error("Médico não encontrado");

        const medico = await responseMedic.json();

        if(!medico.agendamentos){
            medico.agendamentos = {};
        }


        if(medico.agendamentos[dataAgendada]){

            if(!medico.agendamentos[dataAgendada].reservas.includes(horaAgendada)){
                medico.agendamentos[dataAgendada].reservas.push(horaAgendada)
            }
        }else {
            medico.agendamentos[dataAgendada] = {
                reservas: [horaAgendada]
            };
        }

        const responseUpdate = await fetch(`${urlApi}medicos/${idMedic}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(medico)
        });        

        if(!responseUpdate.ok){
            throw new Error(`Erro na requisição: ${responseUpdate.status}`);
        }

        console.log("Agendamento realizado com sucesso");

        
    } catch (error) {
        console.error('Ocorreu um erro ao carregar o JSON:', error);        
    }
}

async function loadingConsultas() {
    try {

        const response  = await fetch(`${urlApi}consultas`)

        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const dados = await response.json();

        return dados;
        
    } catch (error) {
        console.error('Ocorreu um erro ao carregar o JSON:', error);
    }
}

async function updateStatusConsulta(consultaId, newStatus){
    try {
        // Busca os dados da consulta
        const response = await fetch(`${urlApi}consultas`);
        if(!response.ok) throw new Error(`Erro na requisição: ${response.status}`);
        const dados = await response.json();

        const consultaToUpdate = dados.find(consulta => consulta.id === consultaId);
        if(!consultaToUpdate) throw new Error(`Consulta não encontrada.`);

        // SE FOR CANCELAR, PRIMEIRO LIBERA O HORÁRIO DO MÉDICO
        if(newStatus === "Cancelada"){
            const dataAgendada = consultaToUpdate.data;
            const idMedico = consultaToUpdate.medicoId;
            const horaAgendada = consultaToUpdate.hora;

            // Busca o médico para pegar o objeto completo
            const responseMedico = await fetch(`${urlApi}medicos/${idMedico}`);
            if(!responseMedico.ok) throw new Error("Médico não encontrado");
            
            const medico = await responseMedico.json();

            // Se o médico tiver agendamentos naquele dia
            if (medico.agendamentos && medico.agendamentos[dataAgendada]) {
                
                // Remove o horário específico da lista de reservas
                medico.agendamentos[dataAgendada].reservas = medico.agendamentos[dataAgendada].reservas.filter(h => h !== horaAgendada);

                // Se a lista de reservas ficou vazia, apaga o dia inteiro
                if (medico.agendamentos[dataAgendada].reservas.length === 0) {
                    delete medico.agendamentos[dataAgendada];
                }

                // Salva o médico atualizado (PUT)
                const updateMedico = await fetch(`${urlApi}medicos/${idMedico}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(medico)
                });

                if(!updateMedico.ok) throw new Error(`Erro ao liberar horário do médico: ${updateMedico.status}`);
            }
        }

        // 3. ATUALIZA O STATUS DA CONSULTA
        consultaToUpdate.status = newStatus;

        const updateConsulta = await fetch(`${urlApi}consultas/${consultaToUpdate.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(consultaToUpdate)
        });

        if(!updateConsulta.ok) throw new Error(`Erro ao atualizar o status: ${updateConsulta.status}`);

        console.log("Status atualizado e horário liberado com sucesso!");

    } catch (error) {
        console.error('Ocorreu um erro ao atualizar a consulta:', error);
    }
}

async function addAgendamento(idPaciente, idMedico, dataDb, horaDb) {

    try {

        const responseConsulta = await fetch(`${urlApi}consultas`);

        
        const consultas = await responseConsulta.json();

        const temConflito = consultas.find(consulta => {
            return Number(consulta.pacienteId) === Number(idPaciente) &&
            consulta.data === dataDb &&
            consulta.hora === horaDb &&
            consulta.status !== "Cancelada"
        });

        if(temConflito){
            console.log("Você já possui uma consulta agendada neste mesmo dia e horário!");
            return false;
        }

        const novaConsulta = {
            "pacienteId": idPaciente,
            "medicoId": idMedico,
            "data": dataDb,
            "hora": horaDb,
            "status": "Aberta"
        }

        const response = await fetch(`${urlApi}consultas`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(novaConsulta)
        });

        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const dados = await response.json();

        console.log("Novo Agendamento salvo", dados)

        return true;
        
    } catch (error) {
        console.error('Ocorreu um erro ao carregar o JSON:', error);
        return false;
    }
}

export { loadingData, updatePassword , loadingProfessional, loadingConsultas, updateStatusConsulta, addAgendamento, updateAgendamentosMedico };