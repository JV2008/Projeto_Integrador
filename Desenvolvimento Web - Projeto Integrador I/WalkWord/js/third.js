// Validar e confirmar pedido
function confirmarPedido() {
    const enderecoData = localStorage.getItem('enderecoEntrega');
    const pagamentoData = localStorage.getItem('metodoPagamento');

    if (!enderecoData || !pagamentoData) {
        mostrarMensagemErro('Dados incompletos. Por favor, volte e preencha todos os campos obrigatórios.');
        return false;
    }

    // Salvar confirmação
    localStorage.setItem('pedidoConfirmado', JSON.stringify({
        endereco: JSON.parse(enderecoData),
        pagamento: pagamentoData,
        timestamp: new Date().toISOString()
    }));

    return true;
}

// Preencher dados de revisão
function preencherDadosRevisao() {
    const enderecoData = localStorage.getItem('enderecoEntrega');
    const pagamentoData = localStorage.getItem('metodoPagamento');

    if (!enderecoData || !pagamentoData) {
        mostrarMensagemErro('Dados incompletos. Por favor, volte e preencha todos os campos.');
        return;
    }

    const endereco = JSON.parse(enderecoData);
    let pagamento = pagamentoData;

    // Verificar se pagamento é JSON (cartão com dados adicionais)
    let metodoExibicao = pagamento;
    try {
        const pagamentoObj = JSON.parse(pagamento);
        metodoExibicao = pagamentoObj.metodo;
        
        // Se for cartão, mostrar informações do cartão
        if (pagamentoObj.metodo === 'Cartão') {
            metodoExibicao = `Cartão<br><small style="color: #666;">Titulário: ${pagamentoObj.titular}</small><br><small style="color: #666;">Agência: ${pagamentoObj.agencia}</small>`;
        }
    } catch (e) {
        // Se não for JSON, usar como string simples
    }

    const reviewAddress = document.querySelector('.review-address');
    const reviewPayment = document.querySelector('.review-payment');

    if (reviewAddress) {
        reviewAddress.innerHTML = `
            ${endereco.nome}<br>
            ${endereco.endereco}, ${endereco.numero} ${endereco.complemento ? endereco.complemento + '<br>' : ''}<br>
            ${endereco.bairro} - ${endereco.estado}/${endereco.cidade}<br>
            CEP: ${endereco.cep}
        `;
    }

    if (reviewPayment) {
        reviewPayment.innerHTML = metodoExibicao;
    }
}



// Adicionar listeners ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    // Preencher dados de revisão
    preencherDadosRevisao();

    // Modificar onclick do botão "Confirmar Pedido"
    const botoesConfirmar = document.querySelectorAll('button[type="button"]');
    botoesConfirmar.forEach(botao => {
        if (botao.textContent.includes('Confirmar')) {
            botao.onclick = function(event) {
                event.preventDefault();
                if (confirmarPedido()) {
                    window.location.href = '../pages/confirmation.html';
                }
            };
        }
    });

    // Botão voltar funciona normalmente
});