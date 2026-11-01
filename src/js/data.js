async function loadingData() {

    try {

        const response = await fetch(`http://localhost:3000/pacientes`);

        if(!response.ok){
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        const dados = await response.json();

        return dados;
        
    } catch (error) {
        console.error('Ocorreu um erro ao carregar o JSON:', error);
    }
    
}

async function updatePassword(cpf, newPassword) {
     try {

        const response = await fetch(`http://localhost:3000/pacientes`);

        if(!response.ok){
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        const dados = await response.json();

        const userToUpdate = dados.find(user => user.cpf === cpf);
        
        if (!userToUpdate) {
            throw new Error('Usuário não encontrado.');
        }

        userToUpdate.senha = newPassword;

        const updateResponse = await fetch(`http://localhost:3000/pacientes/${userToUpdate.id}`, {
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

export { loadingData, updatePassword };