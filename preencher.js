document.addEventListener('DOMContentLoaded', () => {
    const armariosDisponiveis = document.getElementById('armarios-disponiveis');
    let armarioSelecionado = null;

    function preencherArmariosDisponiveis() {
        armariosDisponiveis.innerHTML = '<option value="">Selecione um Armário</option>';
        const armariosLiberados = document.querySelectorAll('.armario.liberado');
        armariosLiberados.forEach((armario) => {
            const bloco = armario.closest('.bloco').getAttribute('id');
            const andar = armario.parentElement.getAttribute('data-andar');
            const numeroArmario = armario.getAttribute('data-armario');
            const option = document.createElement('option');
            option.value = numeroArmario;
            option.textContent = `Bloco ${bloco} - Andar ${andar} - Armário ${numeroArmario}`;
            armariosDisponiveis.appendChild(option);
        });
    }

    preencherArmariosDisponiveis();

    document.getElementById('selecionar-armario').addEventListener('click', () => {
        const numeroArmarioSelecionado = armariosDisponiveis.value;
        if (numeroArmarioSelecionado) {
            if (armarioSelecionado) {
                armarioSelecionado.classList.remove('ocupado');
                armarioSelecionado.classList.add('liberado');
            }
            armarioSelecionado = document.querySelector(`.armario[data-armario="${numeroArmarioSelecionado}"]`);
            armarioSelecionado.classList.remove('liberado');
            armarioSelecionado.classList.add('ocupado');
            alert(`Você selecionou o Armário ${numeroArmarioSelecionado}`);

            const alunoRA = sessionStorage.getItem('alunoRA'); // Obtém o RA do aluno salvo no sessionStorage

            atualizarArmarioNoServidor(alunoRA, numeroArmarioSelecionado) // Envia a atualização para o servidor
                .then(() => {
                    preencherArmariosDisponiveis();
                })
                .catch(error => {
                    console.error('Erro ao atualizar armário:', error);
                    alert('Erro ao atualizar armário. Tente novamente.');
                });
        } else {
            alert('Por favor, selecione um armário disponível.');
        }
    });

    document.getElementById('liberar-armario').addEventListener('click', () => {
        if (armarioSelecionado) {
            const numeroArmarioOcupado = armarioSelecionado.getAttribute('data-armario');
            armarioSelecionado.classList.remove('ocupado');
            armarioSelecionado.classList.add('liberado');

            const alunoRA = sessionStorage.getItem('alunoRA'); // Obtém o RA do aluno salvo no sessionStorage

            liberarArmarioNoServidor(alunoRA)
                .then(() => {
                    limparSessionStorage(); // Limpa o sessionStorage após sucesso na liberação do armário
                    alert(`Você liberou o Armário ${numeroArmarioOcupado}`);
                    window.location.href = '/'; // Redireciona de volta para a página inicial
                })
                .catch(error => {
                    console.error('Erro ao liberar armário:', error);
                    alert('Erro ao liberar armário. Tente novamente.');
                });

            armarioSelecionado = null;
            preencherArmariosDisponiveis();
        } else {
            alert('Você não tem um armário ocupado para liberar.');
        }
    });

    function atualizarArmarioNoServidor(ra, numeroArmario) {
        return fetch('/atualizar-armario', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ra, numeroArmario }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message !== 'Cadastro atualizado com sucesso') {
                throw new Error('Erro ao atualizar armário');
            }
        });
    }

    function liberarArmarioNoServidor(ra) {
        return fetch('/liberar-armario', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ra }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message !== 'Armário liberado e cadastro atualizado com sucesso') {
                throw new Error('Erro ao liberar armário');
            }
        });
    }

    function limparSessionStorage() {
        sessionStorage.removeItem('alunoRA');
    }
});
