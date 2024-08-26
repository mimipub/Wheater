async function buscarDados() {
    await getAddressByCep();
    await getAdressByPrevisao();
}

async function getAddressByCep() {
    const cep = document.getElementById('CEP').value;
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        console.log(data);

        document.getElementById('Rua').value = data.logradouro || "Não encontrado";
        document.getElementById('Bairro').value = data.bairro || "Não encontrado";
        document.getElementById('Cidade').value = data.localidade + "/" + data.uf || "Não encontrado";
    } catch (error) {
        alert('Erro ao buscar o CEP: ' + error.message);
    }
}

async function getAdressByPrevisao() {
    const lat = document.getElementById('Latitude').value;
    const lon = document.getElementById('Longitude').value;
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`);
        const data = await response.json();
        console.log(data);

        document.getElementById('resposta').innerHTML = ""; // Limpa a área de resposta antes de adicionar novos dados
        for (let index = 0; index < data.hourly.temperature_2m.length; index++) {
            document.getElementById('resposta').innerHTML += `<div> ${data.hourly.time[index]} - ${data.hourly.temperature_2m[index]}°C</div>`;
        }
    } catch (error) {
        alert('Erro ao buscar a previsão: ' + error.message);
    }
}
