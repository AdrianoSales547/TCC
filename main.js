document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const ra = document.getElementById('ra').value;
        const bloco = document.getElementById('bloco').value;

        const dados = { nome, email, ra, bloco };

        fetch('/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Aluno registrado com sucesso') {
                alert('Aluno registrado com sucesso!');
                sessionStorage.setItem('alunoRA', ra); // Salva o RA do aluno no sessionStorage
                window.location.href = `${bloco}.html`; // Redirecionamento dinâmico baseado no bloco escolhido
            } else {
                throw new Error('Erro ao registrar aluno');
            }
        })
        .catch(error => {
            console.error('Erro ao registrar aluno:', error);
            alert('Erro ao registrar aluno. Tente novamente.');
        });
    });
});
