document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.card-section');
    
    function renderFavoritos() {
        let favoritos = JSON.parse(localStorage.getItem('walkword_favoritos')) || [];
        
        if (favoritos.length === 0) {
            container.innerHTML = `
                <h2 class="section-title">Meus Favoritos</h2>
                <div style="text-align: center; padding: 40px; color: #888;">
                    <p>Sua lista de favoritos está vazia no momento.</p>
                </div>
            `;
            return;
        }

        let html = '<h2 class="section-title">Meus Favoritos</h2><div class="products-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; margin-top: 20px;">';
        
        favoritos.forEach((item, index) => {
            html += `
                <article class="product-card" style="border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden; position: relative; background: #fff;">
                    <div class="card-image-wrapper" style="position: relative; height: 300px;">
                        <button class="remove-fav-btn" data-index="${index}" style="position: absolute; top: 10px; right: 10px; background: white; border: none; border-radius: 50%; width: 35px; height: 35px; cursor: pointer; color: #e63946; z-index: 10; box-shadow: 0 2px 5px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center;">
                            <i class="fa-solid fa-heart"></i>
                        </button>
                        <img src="${item.imgSrc}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div class="card-info" style="padding: 15px;">
                        <h3 style="font-size: 1rem; margin-bottom: 5px;">${item.title}</h3>
                        <p class="price" style="font-weight: 600; color: #2c3e50;">${item.price}</p>
                    </div>
                </article>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-fav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.currentTarget.getAttribute('data-index');
                let favs = JSON.parse(localStorage.getItem('walkword_favoritos')) || [];
                const removedItem = favs[idx].title;
                favs.splice(idx, 1);
                localStorage.setItem('walkword_favoritos', JSON.stringify(favs));
                alert(removedItem + ' removido dos favoritos!');
                renderFavoritos(); // Re-render
            });
        });
    }

    renderFavoritos();
});
