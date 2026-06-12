document.addEventListener('DOMContentLoaded', () => {
    const sizeChips = document.querySelectorAll('.size-chip');
    const colorChips = document.querySelectorAll('.color-chip');

    sizeChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Only one size can be selected
            sizeChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            console.log(`Tamanho preferido: ${chip.textContent}`);
            showToast(`Tamanho preferido alterado para: ${chip.textContent}`);
        });
    });

    colorChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Toggle active state for colors (allows multiple selection)
            chip.classList.toggle('active');
            
            const color = chip.getAttribute('data-color');
            const state = chip.classList.contains('active') ? 'selecionada' : 'removida';
            console.log(`Cor ${color} foi ${state}.`);
            showToast(`Cor ${color} ${state}!`);
        });
    });

    // --- HELPER: PREMIUM TOAST NOTIFICATION ---
    let toastTimeout;
    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        
        clearTimeout(toastTimeout);
        toast.classList.add('show');
        
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }
});