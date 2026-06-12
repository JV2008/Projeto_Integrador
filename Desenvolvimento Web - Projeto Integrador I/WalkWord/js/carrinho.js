
document.addEventListener('DOMContentLoaded', function () {

    // ── Referências aos elementos da página ──────────────────
    const cartItemsList   = document.getElementById('cart-items-list');
    const cartItemCount   = document.getElementById('cart-item-count');
    const cartSubtotal    = document.getElementById('cart-subtotal');
    const cartGrandTotal  = document.getElementById('cart-grand-total');
    const impactWater     = document.getElementById('impact-water');
    const impactCo2       = document.getElementById('impact-co2');
    const emptyCartState  = document.getElementById('empty-cart-state');
    const cartLayout      = document.getElementById('cart-layout-container');
    const btnCheckout     = document.getElementById('btn-checkout');
    const discountWrapper = document.getElementById('discount-wrapper');

    // ── Carregar carrinho do localStorage ────────────────────
    function getCart() {
        return JSON.parse(localStorage.getItem('walkword_carrinho')) || [];
    }

    // ── Salvar carrinho no localStorage ─────────────────────
    function saveCart(cart) {
        localStorage.setItem('walkword_carrinho', JSON.stringify(cart));
    }

    // ── Formatar valor monetário (ex: 239.9 → "R$ 239,90") ──
    function formatCurrency(value) {
        return 'R$ ' + value.toFixed(2).replace('.', ',');
    }

    // ── Atualizar totais e impacto ecológico ─────────────────
    function atualizarTotais(cart) {
        var subtotal   = 0;
        var totalWater = 0;
        var totalCo2   = 0;

        cart.forEach(function (item) {
            subtotal   += item.price * item.quantity;
            totalWater += (item.impact ? item.impact.water : 0) * item.quantity;
            totalCo2   += (item.impact ? item.impact.co2   : 0) * item.quantity;
        });

        cartSubtotal.textContent   = formatCurrency(subtotal);
        cartGrandTotal.textContent = formatCurrency(subtotal); // frete grátis
        impactWater.textContent    = totalWater.toLocaleString('pt-BR') + 'L';
        impactCo2.textContent      = totalCo2.toFixed(1).replace('.', ',') + 'kg';

        // Contador de itens
        var totalQty = cart.reduce(function (acc, item) { return acc + item.quantity; }, 0);
        cartItemCount.textContent = totalQty + (totalQty === 1 ? ' item na sua sacola' : ' itens na sua sacola');
    }

    // ── Renderizar um único item na lista ────────────────────
    function criarItemRow(item, index) {
        var row = document.createElement('div');
        row.className = 'cart-item-row';
        row.setAttribute('data-index', index);

        row.innerHTML =
            '<div class="cart-product-info">' +
                '<img class="cart-item-img" src="' + item.image + '" alt="' + item.name + '">' +
                '<div class="cart-product-details">' +
                    '<span class="cart-product-tag">Sustentável</span>' +
                    '<p class="cart-product-name">' + item.name + '</p>' +
                    '<p class="cart-product-meta">Tamanho: ' + item.size + '</p>' +
                '</div>' +
            '</div>' +
            '<div class="cart-item-price">' + formatCurrency(item.price) + '</div>' +
            '<div>' +
                '<div class="quantity-selector">' +
                    '<button class="btn-qty-minus" data-index="' + index + '">-</button>' +
                    '<input type="number" class="qty-input" value="' + item.quantity + '" min="1" data-index="' + index + '" readonly>' +
                    '<button class="btn-qty-plus" data-index="' + index + '">+</button>' +
                '</div>' +
            '</div>' +
            '<div class="cart-item-total">' + formatCurrency(item.price * item.quantity) + '</div>' +
            '<button class="btn-remove-item" data-index="' + index + '" aria-label="Remover item">' +
                '<i class="fa-solid fa-xmark"></i>' +
            '</button>';

        return row;
    }

    // ── Renderizar todos os itens do carrinho ────────────────
    function renderizarCarrinho() {
        var cart = getCart();

        cartItemsList.innerHTML = '';

        if (cart.length === 0) {
            // Exibe estado de carrinho vazio
            cartLayout.style.display = 'none';
            emptyCartState.style.display = 'block';
            cartItemCount.textContent = '0 itens na sua sacola';
            cartSubtotal.textContent   = 'R$ 0,00';
            cartGrandTotal.textContent = 'R$ 0,00';
            impactWater.textContent    = '0L';
            impactCo2.textContent      = '0,0kg';
            return;
        }

        // Exibe layout normal
        cartLayout.style.display = '';
        emptyCartState.style.display = 'none';

        cart.forEach(function (item, index) {
            cartItemsList.appendChild(criarItemRow(item, index));
        });

        atualizarTotais(cart);

        // Registra eventos nos botões renderizados
        registrarEventosItens();
    }

    // ── Eventos de quantidade e remoção (delegados via parent) ─
    function registrarEventosItens() {
        // Decrementar quantidade
        cartItemsList.querySelectorAll('.btn-qty-minus').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var idx  = parseInt(this.getAttribute('data-index'));
                var cart = getCart();

                if (cart[idx].quantity > 1) {
                    cart[idx].quantity -= 1;
                } else {
                    // Remove item se quantidade chegar a zero
                    cart.splice(idx, 1);
                }

                saveCart(cart);
                renderizarCarrinho();
            });
        });

        // Incrementar quantidade
        cartItemsList.querySelectorAll('.btn-qty-plus').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var idx  = parseInt(this.getAttribute('data-index'));
                var cart = getCart();
                cart[idx].quantity += 1;
                saveCart(cart);
                renderizarCarrinho();
            });
        });

        // Remover item
        cartItemsList.querySelectorAll('.btn-remove-item').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var idx  = parseInt(this.getAttribute('data-index'));
                var cart = getCart();
                cart.splice(idx, 1);
                saveCart(cart);
                renderizarCarrinho();
            });
        });
    }

    // ── Objetivo 2: Botão "Finalizar Compra" → redireciona para first.html ──
    if (btnCheckout) {
        btnCheckout.addEventListener('click', function () {
            var cart = getCart();

            if (cart.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Sacola vazia',
                    text: 'Adicione produtos antes de finalizar a compra.',
                    confirmButtonColor: '#2D5431',
                    confirmButtonText: 'Explorar Coleção'
                }).then(function () {
                    window.location.href = 'catalogo.html';
                });
                return;
            }

            window.location.href = 'first.html';
        });
    }

    renderizarCarrinho();
});
