document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.pedido-item');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const titulo = card.querySelector('.pedido-code').textContent;
            const preco = card.querySelector('.pedido-price').textContent;
            const status = card.querySelector('.badge-status').textContent;
            
            // Replicate original alert with matching unified details
            alert(`🔍 Detalhes do ${titulo}\nValor: ${preco}\nStatus: ${status}`);
        });

        // Ensure cursor points correctly
        card.style.cursor = 'pointer';
    });
});
