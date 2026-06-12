document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.custom-checkbox-container input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const label = event.target.parentElement.textContent.trim();
            const status = event.target.checked ? 'ativada' : 'desativada';
            
            console.log(`Notificação "${label}" foi ${status}.`);
            
            // Show the elegant unified toast notification
            showToast(`Configuração de "${label}" salva!`);
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