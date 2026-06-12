// Validação de seleção de forma de pagamento
function validarPagamento() {
    const tabs = document.querySelectorAll('.tab');
    let metodoPagamentoSelecionado = false;
    let metodoAtivo = '';

    // Verificar se algum método de pagamento foi selecionado
    tabs.forEach(tab => {
        if (tab.classList.contains('active')) {
            metodoPagamentoSelecionado = true;
            metodoAtivo = tab.textContent.trim();
        }
    });

    if (!metodoPagamentoSelecionado) {
        mostrarMensagemErro('Por favor, selecione uma forma de pagamento.');
        return false;
    }

    // Validar campos específicos do método de pagamento
    if (metodoAtivo.includes('Cartão')) {
        if (!validarCamposCartao()) {
            return false;
        }
    }

    // Salvar dados no localStorage
    salvarDadosPagamento();
    return true;
}

// Validar campos do cartão
function validarCamposCartao() {
    // Definir regras de validação para cartão
    const regras = [
        { campo: 'inputNumeroCartao', obrigatorio: true, minLength: 13 },
        { campo: 'inputAgencia', obrigatorio: true },
        { campo: 'inputTitular', obrigatorio: true, minPalavras: 2 }
    ];

    // Limpar erros anteriores
    limparErros(['inputNumeroCartao', 'inputAgencia', 'inputTitular']);

    // Validar usando regras em loop
    const ehValido = validarCamposComRegras(regras);

    // Mostrar mensagem de erro se necessário
    if (!ehValido) {
        mostrarMensagemErro('Por favor, preencha todos os campos do cartão corretamente.');
    }

    return ehValido;
}



// Alternar aba de pagamento
function alternarAba(event) {
    event.preventDefault();
    
    // Remover classe active de todas as abas
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Adicionar classe active à aba clicada
    const tabClicada = event.target.closest('.tab');
    tabClicada.classList.add('active');

    // Limpar mensagem de erro
    limparMensagemErro();

    // Mostrar/ocultar áreas conforme o método selecionado
    atualizarAreasVisiblesFormaPagamento(tabClicada);
}

// Atualizar áreas visíveis conforme forma de pagamento
function atualizarAreasVisiblesFormaPagamento(tabClicada) {
    const pixArea = document.getElementById('pixArea');
    const cartaoArea = document.getElementById('cartaoArea');
    const boletoArea = document.getElementById('boletoArea');

    // Ocultar todas as áreas
    pixArea.style.display = 'none';
    cartaoArea.style.display = 'none';
    boletoArea.style.display = 'none';

    // Mostrar a área apropriada
    const textoCelula = tabClicada.textContent.trim().toUpperCase();
    
    if (textoCelula.includes('PIX')) {
        pixArea.style.display = 'block';
    } else if (textoCelula.includes('CARTÃO')) {
        cartaoArea.style.display = 'block';
    } else if (textoCelula.includes('BOLETO')) {
        boletoArea.style.display = 'block';
    }
}



// Salvar dados de pagamento
function salvarDadosPagamento() {
    const metodos = ['PIX', 'Cartão', 'Boleto'];
    let metodoSelecionado = '';

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab, index) => {
        if (tab.classList.contains('active')) {
            metodoSelecionado = metodos[index];
        }
    });

    let dadosPagamento = {
        metodo: metodoSelecionado
    };

    // Se for cartão, salvar também os dados do cartão
    if (metodoSelecionado === 'Cartão') {
        dadosPagamento.numeroCartao = document.getElementById('inputNumeroCartao').value;
        dadosPagamento.agencia = document.getElementById('inputAgencia').value;
        dadosPagamento.titular = document.getElementById('inputTitular').value;
    }

    localStorage.setItem('metodoPagamento', JSON.stringify(dadosPagamento));
}

// Adicionar listeners ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar máscaras com IMask
    inicializarMascaras();

    // Adicionar eventos aos botões de aba
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', alternarAba);
    });

    // Limpar erro ao digitar
    adicionarListenerRemoverErro(['inputNumeroCartao', 'inputAgencia', 'inputTitular']);

    // Modificar onclick do botão "Revisar Pedido"
    const botoesRevisar = document.querySelectorAll('button[type="button"]');
    botoesRevisar.forEach(botao => {
        if (botao.textContent.includes('Revisar')) {
            botao.onclick = function(event) {
                event.preventDefault();
                if (validarPagamento()) {
                    window.location.href = '../pages/third.html';
                }
            };
        }
    });
});