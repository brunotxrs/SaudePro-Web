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

export { loadingData }