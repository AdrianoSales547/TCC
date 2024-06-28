document.addEventListener('DOMContentLoaded', function() {
    const tabelaAlunos = document.getElementById('tabela-alunos');

    // Função para adicionar um aluno à tabela
    function adicionarAlunoTabela(aluno) {
        const row = tabelaAlunos.insertRow();
        row.innerHTML = `
            <td>${aluno.name}</td>
            <td>${aluno.email}</td>
            <td>${aluno.ra}</td>
            <td>
                <button onclick="removerAluno(this)">Remover</button>
                <button onclick="alocarArmario(this)">Alocar em Novo Armário</button>
            </td>
        `;
    }

    // Função para preencher a tabela com alunos
    function preencherTabelaAlunos(alunos) {
        alunos.forEach(aluno => {
            adicionarAlunoTabela(aluno);
        });
    }

    // Evento para receber os dados dos alunos do index.html
    window.addEventListener('message', function(event) {
        if (event.origin !== window.location.origin) return; // Verifica a origem da mensagem

        const { alunos } = event.data; // Assume que os alunos são enviados no objeto event.data
        if (alunos && Array.isArray(alunos)) {
            preencherTabelaAlunos(alunos);
        }
    });

    // Função para remover um aluno da tabela
    window.removerAluno = function(botaoRemover) {
        const row = botaoRemover.parentElement.parentElement;
        tabelaAlunos.deleteRow(row.rowIndex);
    };

    // Função para alocar um aluno em um novo armário (simulação)
    window.alocarArmario = function(botaoAlocar) {
        const row = botaoAlocar.parentElement.parentElement;
        const alunoNome = row.cells[0].innerText; // Obtém o nome do aluno
        alert(`Alocando aluno ${alunoNome} em um novo armário.`); // Exemplo de alerta, implementação real depende da lógica de negócio
    };
});
