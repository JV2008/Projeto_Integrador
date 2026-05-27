document.addEventListener('DOMContentLoaded', () => {
    // Image Gallery Logic
    const featuredImage = document.getElementById('featured-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Update featured image source
            featuredImage.src = thumbnail.src;
            
            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        });
    });

    // Size Selection Logic
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Quantity Logic
    const qtyInput = document.getElementById('qty-input');
    const qtyPlus = document.getElementById('qty-plus');
    const qtyMinus = document.getElementById('qty-minus');

    qtyPlus.addEventListener('click', () => {
        qtyInput.value = parseInt(qtyInput.value) + 1;
    });

    qtyMinus.addEventListener('click', () => {
        if (parseInt(qtyInput.value) > 1) {
            qtyInput.value = parseInt(qtyInput.value) - 1;
        }
    });

    // Add to Cart Feedback
    const addToCartBtn = document.querySelector('.btn-add-cart');
    addToCartBtn.addEventListener('click', () => {
        const selectedSize = document.querySelector('.size-btn.active').textContent;
        const quantity = qtyInput.value;
        
        addToCartBtn.textContent = 'Adicionado!';
        addToCartBtn.style.backgroundColor = '#162210';
        
        setTimeout(() => {
            addToCartBtn.textContent = 'Adicionar ao Carrinho';
            addToCartBtn.style.backgroundColor = '#4d5c41';
        }, 2000);

        console.log(`Adicionado ao carrinho: Camiseta Eco Consciente, Tamanho: ${selectedSize}, Qtd: ${quantity}`);
    });
});
