const form = document.getElementById('form-exercicios');
const tabelaExercicios = document.getElementById('tabela-exercicios').getElementsByTagName('tbody')[0];
const pesquisarBtn = document.getElementById('pesquisar-btn');

let exercicios = JSON.parse(localStorage.getItem('exercicios')) || [];

function atualizarTabela(exercicios) {
    tabelaExercicios.innerHTML = ''; 
    exercicios.forEach(exercicio => {
        const row = tabelaExercicios.insertRow();
        row.insertCell(0).innerText = exercicio.nome;
        row.insertCell(1).innerText = exercicio.descricao;
        row.insertCell(2).innerText = exercicio.data;
        row.insertCell(3).innerText = exercicio.duracao;
    });
}

function validarData(data) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/; 
    return regex.test(data);
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const data = document.getElementById('data').value.trim();
    const duracao = parseInt(document.getElementById('duracao').value);

    // Validação
    if (!validarData(data) || isNaN(duracao) || duracao <= 0 || nome === '' || descricao === '') {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const exercicio = { nome, descricao, data, duracao };
    exercicios.push(exercicio);
    localStorage.setItem('exercicios', JSON.stringify(exercicios)); 
    atualizarTabela(exercicios); 
    form.reset();
});

pesquisarBtn.addEventListener('click', function() {
    const tipoPesquisa = document.getElementById('pesquisa-tipo-input').value.trim().toLowerCase();
    const dataPesquisa = document.getElementById('pesquisa-data-input').value.trim();

    const resultados = exercicios.filter(exercicio => {
        const tipoValido = !tipoPesquisa || exercicio.nome.toLowerCase().includes(tipoPesquisa); 
        const dataValida = !dataPesquisa || exercicio.data === dataPesquisa; 

        return tipoValido && dataValida; 
    });

    atualizarTabela(resultados);
});

atualizarTabela(exercicios);
