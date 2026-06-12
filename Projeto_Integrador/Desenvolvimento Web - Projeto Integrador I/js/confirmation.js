// Exibir dados de confirmação
document.addEventListener('DOMContentLoaded', function() {
    const pedidoData = localStorage.getItem('pedidoConfirmado');
    
    if (!pedidoData) {
        // Se não houver dados, mostrar alerta e redirecionar
        Swal.fire({
            icon: 'info',
            title: 'Nenhum Pedido',
            text: 'Redirecionando para primeira página...',
            confirmButtonColor: '#2D5431',
            confirmButtonText: 'OK',
            didClose: function() {
                window.location.href = 'first/first.html';
            }
        });
        return;
    }

    const pedido = JSON.parse(pedidoData);
    
    // Exibir mensagem de sucesso com SweetAlert2
    Swal.fire({
        icon: 'success',
        title: '<h2 style="color: #2D5431; font-family: Arial, sans-serif;">Pedido Confirmado!</h2>',
        text: 'Sua compra foi realizada com sucesso.',
        confirmButtonColor: '#2D5431',
        confirmButtonText: 'Continuar'
    });

    console.log('Pedido confirmado:', pedido);
    
    // Adicionar funcionalidade para limpar dados quando necessário
    const botaoNovoCompra = document.querySelector('button[onclick*="first.html"]');
    if (botaoNovoCompra) {
        botaoNovoCompra.addEventListener('click', function() {
            limparDadosStorage(['enderecoEntrega', 'metodoPagamento', 'pedidoConfirmado']);
        });
    }
});

// Função para gerar um resumo em PDF ou imprimir (opcional)
function gerarResumo() {
    const pedidoData = localStorage.getItem('pedidoConfirmado');
    if (pedidoData) {
        const pedido = JSON.parse(pedidoData);
        console.log('Gerando resumo para o pedido:', pedido);
        window.print();
    }
}
