// Inject custom styles for error highlighting, shaking, and toast notifications
const customStyles = document.createElement("style");
customStyles.textContent = `
    /* Input Error Styling */
    .input-error {
        border: 1.5px solid #a84a3c !important;
        background-color: #fdf5f4 !important;
    }
    
    /* Shake Animation for fields */
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-6px); }
        40%, 80% { transform: translateX(6px); }
    }
    .shake-anim {
        animation: shake 0.4s ease-in-out;
    }
    
    /* Toast Notifications Container */
    .toast-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
    }
    
    /* Individual Toast */
    .toast {
        background-color: #ffffff;
        color: #333333;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.08);
        display: flex;
        align-items: center;
        gap: 12px;
        font-family: 'Inter', sans-serif;
        font-size: 0.95rem;
        min-width: 300px;
        transform: translateX(120%);
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s;
        opacity: 0;
        border-left: 5px solid #536047;
        pointer-events: auto;
    }
    
    .toast.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .toast-success {
        border-left-color: #536047;
    }
    
    .toast-error {
        border-left-color: #a84a3c;
    }
    
    .toast-icon {
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .toast-success .toast-icon {
        color: #536047;
    }
    
    .toast-error .toast-icon {
        color: #a84a3c;
    }
`;
document.head.appendChild(customStyles);

// Toast display helper function
function showToast(message, type = "success") {
    let container = document.querySelector(".toast-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let iconHTML = '';
    if (type === "success") {
        iconHTML = '<i class="fa-solid fa-circle-check toast-icon"></i>';
    } else if (type === "error") {
        iconHTML = '<i class="fa-solid fa-circle-exclamation toast-icon"></i>';
    } else {
        iconHTML = '<i class="fa-solid fa-circle-info toast-icon"></i>';
    }

    toast.innerHTML = `
        ${iconHTML}
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Trigger transition
    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    // Auto remove
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
            if (container.children.length === 0) {
                container.remove();
            }
        }, 400);
    }, 3000);
}

// Check for redirect success message from registration
window.addEventListener("DOMContentLoaded", () => {
    const signupSuccess = localStorage.getItem("signupSuccess");
    if (signupSuccess) {
        showToast("Conta criada com sucesso! Faça seu login.", "success");
        localStorage.removeItem("signupSuccess");
    }
});

// Password visibility toggle logic
const togglePasswordIcon = document.querySelector(".icone_senha");
const passwordInput = document.getElementById("password");

if (togglePasswordIcon && passwordInput) {
    togglePasswordIcon.addEventListener("click", () => {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        
        // Toggle icon classes
        if (type === "text") {
            togglePasswordIcon.classList.remove("fa-eye");
            togglePasswordIcon.classList.add("fa-eye-slash");
        } else {
            togglePasswordIcon.classList.remove("fa-eye-slash");
            togglePasswordIcon.classList.add("fa-eye");
        }
    });
}

// Form Submission & Fake Login logic
const form = document.getElementById("formulario_login");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let hasError = false;

    // Reset error styling
    emailInput.classList.remove("input-error");
    passwordInput.classList.remove("input-error");

    if (email === "") {
        emailInput.classList.add("input-error");
        triggerShake(emailInput);
        hasError = true;
    }

    if (password === "") {
        passwordInput.classList.add("input-error");
        triggerShake(passwordInput);
        hasError = true;
    }

    if (hasError) {
        showToast("Preencha todos os campos obrigatórios.", "error");
        return;
    }

    // Default Fake Credentials
    const defaultEmail = "user@walkword.com";
    const defaultPassword = "123";

    // Retrieve registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    
    // Check if matching default account or a registered account
    const userFound = registeredUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
    
    const isDefaultMatch = (email.toLowerCase() === defaultEmail && password === defaultPassword);
    const isRegisteredMatch = userFound && userFound.password === password;

    if (isDefaultMatch || isRegisteredMatch) {
        showToast("Login realizado com sucesso! Redirecionando...", "success");
        
        // Save current logged user session
        const loggedUser = {
            email: email,
            nome: userFound ? userFound.nome : "Usuário WalkWord",
            isDefault: isDefaultMatch
        };
        localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

        // Disable button during redirect
        const submitButton = form.querySelector("button[type='submit']");
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Carregando...";
        }

        // Redirect after a short delay to allow toast reading
        setTimeout(() => {
            window.location.href = "pagina_produto.html";
        }, 1500);
    } else {
        // Highlight in red & shake inputs
        emailInput.classList.add("input-error");
        passwordInput.classList.add("input-error");
        triggerShake(emailInput.parentElement.classList.contains("input_senha_container") ? emailInput.parentElement : emailInput);
        triggerShake(passwordInput.parentElement.classList.contains("input_senha_container") ? passwordInput.parentElement : passwordInput);
        
        showToast("E-mail ou senha incorretos.", "error");
    }
});

// Helper function to shake elements on error
function triggerShake(element) {
    element.classList.remove("shake-anim");
    void element.offsetWidth; // Force DOM reflow to restart animation
    element.classList.add("shake-anim");
    setTimeout(() => {
        element.classList.remove("shake-anim");
    }, 400);
}