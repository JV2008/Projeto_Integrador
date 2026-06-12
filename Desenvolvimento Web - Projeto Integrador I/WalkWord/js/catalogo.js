class CatalogFilter {
    constructor() {
        this.products = document.querySelectorAll('.product-card');
        this.resultsCount = document.querySelector('.results-count');
        this.clearBtn = document.querySelector('.clear-filters-btn');
        this.groups = ['condicao', 'categoria', 'tamanho'];

        this.bindEvents();
        this.update();
    }

    bindEvents() {
        document.querySelectorAll('[data-filter]').forEach(input => {
            input.addEventListener('change', () => this.update());
        });
        this.clearBtn.addEventListener('click', () => this.clearAll());
    }

    getActiveFilters() {
        const active = {};

        this.groups.forEach(group => {
            const values = Array.from(
                document.querySelectorAll(`[data-filter="${group}"]:checked`)
            ).map(el => el.dataset.value);

            if (values.length > 0) {
                active[group] = values;
            }
        });

        return active;
    }

    productMatches(product, activeFilters) {
        const groups = Object.keys(activeFilters);

        return groups.every(group => {
            const allowedValues = activeFilters[group];
            const productValue = product.dataset[group];

            return allowedValues.includes(productValue);
        });
    }

    update() {
        const activeFilters = this.getActiveFilters();
        const hasActiveFilters = Object.keys(activeFilters).length > 0;
        let visibleCount = 0;

        this.products.forEach(product => {
            const isVisible = hasActiveFilters
                ? this.productMatches(product, activeFilters)
                : true;

            product.style.display = isVisible ? '' : 'none';
            if (isVisible) visibleCount++;
        });

        this.resultsCount.textContent =
            `${visibleCount} produto${visibleCount !== 1 ? 's' : ''} encontrado${visibleCount !== 1 ? 's' : ''}`;
    }

    clearAll() {
        document.querySelectorAll('[data-filter]').forEach(input => {
            input.checked = false;
        });
        this.update();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CatalogFilter();

    // Lógica dos favoritos
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        const card = btn.closest('.product-card');
        if (!card) return;
        
        const title = card.querySelector('h3').textContent;
        let favoritos = JSON.parse(localStorage.getItem('walkword_favoritos')) || [];
        const isFavorito = favoritos.some(item => item.title === title);
        
        const icon = btn.querySelector('i');
        if (isFavorito) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            icon.style.color = '#e63946';
        }

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const price = card.querySelector('.price').textContent;
            const imgSrc = card.querySelector('img').src;
            
            let favs = JSON.parse(localStorage.getItem('walkword_favoritos')) || [];
            const idx = favs.findIndex(item => item.title === title);
            
            if (idx === -1) {
                favs.push({ title, price, imgSrc });
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                icon.style.color = '#e63946';
                alert(title + ' adicionado aos favoritos!');
            } else {
                favs.splice(idx, 1);
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                icon.style.color = '';
                alert(title + ' removido dos favoritos!');
            }
            
            localStorage.setItem('walkword_favoritos', JSON.stringify(favs));
        });
    });
});