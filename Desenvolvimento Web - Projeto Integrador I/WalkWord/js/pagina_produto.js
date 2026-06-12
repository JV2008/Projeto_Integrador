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

    // Add to Cart Logic & Feedback
    const addToCartBtn = document.querySelector('.btn-add-cart');
    addToCartBtn.addEventListener('click', () => {
        const selectedSize = document.querySelector('.size-btn.active') ? document.querySelector('.size-btn.active').textContent.trim() : 'M';
        const quantity = parseInt(qtyInput.value) || 1;
        const productTitle = document.querySelector('.product-title') ? document.querySelector('.product-title').textContent.trim() : 'Jaqueta Denim Sustentável';
        const productPriceText = document.querySelector('.product-price') ? document.querySelector('.product-price').textContent.trim() : 'R$ 239,90';
        
        // Convert price text to numeric value (e.g. "R$239,90" -> 239.90)
        const numericPrice = parseFloat(productPriceText.replace(/[^\d,.-]/g, '').replace(',', '.')) || 239.90;
        
        const featuredImgElement = document.getElementById('featured-image');
        const imgSrc = featuredImgElement ? featuredImgElement.getAttribute('src') : '../img/produto_img1.jpg';

        // Product impact (we can extract this or use a default)
        const impact = {
            water: 2500, // 2500L
            co2: 1.5     // 1.5kg
        };

        const cartItem = {
            id: `jaqueta_denim_${selectedSize}`,
            name: productTitle,
            price: numericPrice,
            image: imgSrc,
            size: selectedSize,
            quantity: quantity,
            impact: impact
        };

        // Get existing cart
        let cart = JSON.parse(localStorage.getItem('walkword_carrinho')) || [];
        
        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(item => item.id === cartItem.id);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push(cartItem);
        }

        // Save back to localStorage
        localStorage.setItem('walkword_carrinho', JSON.stringify(cart));
        
        // Visual feedback
        addToCartBtn.textContent = 'Adicionado!';
        addToCartBtn.style.backgroundColor = '#162210';
        
        setTimeout(() => {
            addToCartBtn.textContent = 'Adicionar ao Carrinho';
            addToCartBtn.style.backgroundColor = '#4d5c41';
            // Redirect to cart page
            window.location.href = 'carrinho.html';
        }, 800);

        console.log(`Adicionado ao carrinho: ${productTitle}, Tamanho: ${selectedSize}, Qtd: ${quantity}`);
    });

    // User Bar Logic (Logged In / Guest status)
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    
    // Create bar style
    const headerStyle = document.createElement('style');
    headerStyle.textContent = `
        .user-top-bar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background-color: #536047;
            color: #ffffff;
            padding: 10px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: 'Inter', sans-serif;
            font-size: 0.85rem;
            letter-spacing: 0.5px;
            z-index: 1000;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .user-top-bar.guest {
            background-color: #f2f1ec;
            color: #5d6159;
            border-bottom: 1px solid #e2e1dc;
        }
        .user-info {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .user-info i {
            font-size: 0.95rem;
        }
        .user-name {
            font-weight: 600;
        }
        .btn-top-bar {
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.4);
            color: #ffffff;
            padding: 4px 12px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.75rem;
            font-weight: 600;
            transition: all 0.2s;
            text-decoration: none;
        }
        .user-top-bar.guest .btn-top-bar {
            border-color: #536047;
            color: #536047;
        }
        .btn-top-bar:hover {
            background-color: #ffffff;
            color: #536047;
            border-color: #ffffff;
        }
        .user-top-bar.guest .btn-top-bar:hover {
            background-color: #536047;
            color: #ffffff;
            border-color: #536047;
        }
    `;
    document.head.appendChild(headerStyle);

    // Create bar element
    const topBar = document.createElement('div');
    
    if (loggedUser) {
        topBar.className = 'user-top-bar';
        topBar.innerHTML = `
            <div class="user-info">
                <i class="fa-solid fa-circle-user"></i>
                <span>Olá, <span class="user-name">${loggedUser.nome || loggedUser.email}</span>! Bem-vindo(a) de volta.</span>
            </div>
            <button class="btn-top-bar" id="btn-logout">Sair</button>
        `;
    } else {
        topBar.className = 'user-top-bar guest';
        topBar.innerHTML = `
            <div class="user-info">
                <i class="fa-solid fa-circle-info"></i>
                <span>Você está visualizando a página como visitante.</span>
            </div>
            <a href="login.html" class="btn-top-bar">Fazer Login</a>
        `;
    }

    // Insert at the beginning of body
    document.body.insertBefore(topBar, document.body.firstChild);

    // Adjust navbar and body positions dynamically to accommodate the fixed user top bar
    const adjustLayoutForTopBar = () => {
        const topBarHeight = topBar.offsetHeight;
        const navbar = document.querySelector('header');
        
        if (navbar) {
            navbar.style.top = `${topBarHeight}px`;
        }
        document.body.style.paddingTop = `${topBarHeight}px`;
    };

    // Run layout adjustment initially
    adjustLayoutForTopBar();
    
    // Adjust again on window resize (handles text wrapping on mobile screens)
    window.addEventListener('resize', adjustLayoutForTopBar);
    
    // Adjust once fonts are loaded to ensure correct height measurements
    if (document.fonts) {
        document.fonts.ready.then(adjustLayoutForTopBar);
    }

    // Attach logout handler if logged in
    if (loggedUser) {
        document.getElementById('btn-logout').addEventListener('click', () => {
            localStorage.removeItem('loggedUser');
            window.location.href = 'login.html';
        });
    }
});