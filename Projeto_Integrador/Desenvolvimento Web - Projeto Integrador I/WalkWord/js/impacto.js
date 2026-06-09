

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SPA TAB SWITCHING SYSTEM ---
    // Only 'impacto' is local to perfil.html now; other tabs navigate to separate pages.
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    const targetBtn = document.getElementById('tab-btn-impacto');
    const targetPane = document.getElementById('tab-impacto');

    if (targetBtn && targetPane) {
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        targetBtn.classList.add('active');
        targetPane.classList.add('active');
    }

    // --- 2. INITIALIZE CHART.JS (EXACT DATA FROM IMAGE) ---
    
    // Config common chart fonts & styles
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = '#888888';
    Chart.defaults.font.size = 11;

    // A. Water Savings Bar Chart
    const waterCtx = document.getElementById('waterChart').getContext('2d');
    const waterChart = new Chart(waterCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr'],
            datasets: [{
                label: 'Economia (L)',
                data: [440, 670, 520, 890],
                backgroundColor: '#3b82f6', // Bright exact blue from image
                hoverBackgroundColor: '#2563eb',
                borderRadius: 4, // Slight corner rounding
                borderSkipped: false,
                barPercentage: 0.55 // Bar thickness proportional to original screenshot
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // Hide legend to match image
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} Litros`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 1000,
                    ticks: {
                        stepSize: 250,
                        callback: function(value) {
                            return value === 0 ? '0' : value;
                        }
                    },
                    grid: {
                        color: '#f1f5f9',
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false // Hide vertical grids like in the image
                    }
                }
            }
        }
    });

    // B. CO2 Reduction Line Chart
    const co2Ctx = document.getElementById('co2Chart').getContext('2d');
    const co2Chart = new Chart(co2Ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr'],
            datasets: [{
                label: 'Redução (kg)',
                data: [2.4, 3.8, 3.0, 5.2], // Exact lines from image
                borderColor: '#4a5568', // Deep grey stroke
                borderWidth: 1.8,
                pointBackgroundColor: '#ffffff', // White circle fill
                pointBorderColor: '#4a5568', // Dark gray circle border
                pointBorderWidth: 1.5,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.35, // Smooth bezier curvature exactly like screenshot
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // Hide legend
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} kg CO₂`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 8,
                    ticks: {
                        stepSize: 2
                    },
                    grid: {
                        color: '#f1f5f9',
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // --- 3. TAB: PEDIDOS INTERACTION ---
    const pedidoItems = document.querySelectorAll('.pedido-item');
    pedidoItems.forEach(item => {
        item.addEventListener('click', () => {
            const code = item.querySelector('.pedido-code').textContent;
            const price = item.querySelector('.pedido-price').textContent;
            const status = item.querySelector('.badge-status').textContent;
            
            // Replicate original alert style but premium behavior
            alert(`🔍 Detalhes do ${code}\nValor: ${price}\nStatus: ${status}`);
        });
    });


    // --- 5. TAB: PREFERÊNCIAS CHIPS INTERACTION ---
    const sizeChips = document.querySelectorAll('.size-chip');
    sizeChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Standard size selector: only one active at a time
            sizeChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            console.log(`Tamanho selecionado: ${chip.textContent}`);
            showToast(`Tamanho preferido alterado para: ${chip.textContent}`);
        });
    });

    const colorChips = document.querySelectorAll('.color-chip');
    colorChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Colors: toggle active state individually (allows multiple preferences)
            chip.classList.toggle('active');
            
            const color = chip.getAttribute('data-color');
            const state = chip.classList.contains('active') ? 'selecionada' : 'removida';
            console.log(`Cor ${color} foi ${state}.`);
            showToast(`Cor ${color} ${state}!`);
        });
    });

    // --- 6. TAB: CONFIGURAÇÕES AUTO-SAVE & TOAST ---
    const configCheckboxes = document.querySelectorAll('.custom-checkbox-container input[type="checkbox"]');
    configCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const labelText = e.target.parentElement.textContent.trim();
            const isChecked = e.target.checked;
            const statusText = isChecked ? 'ativada' : 'desativada';
            
            console.log(`Notificação "${labelText}" foi ${statusText}.`);
            showToast(`Configuração de "${labelText}" salva!`);
        });
    });

    // --- 7. HELPER: PREMIUM TOAST NOTIFICATION ---
    let toastTimeout;
    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        
        // Reset timeout if called consecutively
        clearTimeout(toastTimeout);
        
        toast.classList.add('show');
        
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});
