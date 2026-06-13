const customStyles = document.createElement("style");
customStyles.textContent = `
    .input-error {
        border: 1.5px solid #a84a3c !important;
        background-color: #fdf5f4 !important;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-6px); }
        40%, 80% { transform: translateX(6px); }
    }
    .shake-anim {
        animation: shake 0.4s ease-in-out;
    }
    
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

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);
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

const formCadastro = document.getElementById("formulario_cadastro");

if (formCadastro) {
    formCadastro.addEventListener("submit", (e) => {
        e.preventDefault();

        const nomeInput = document.getElementById("nome");
        const emailInput = document.getElementById("email");
        const cpfInput = document.getElementById("cpf");
        const telefoneInput = document.getElementById("telefone");
        const cidadeInput = document.getElementById("cidade");
        const enderecoInput = document.getElementById("endereco");
        const numeroInput = document.getElementById("numero");
        const cepInput = document.getElementById("cep");
        const senhaInput = document.getElementById("senha");
        const confirmarSenhaInput = document.getElementById("confirmar_senha");


        const allInputs = [nomeInput, emailInput, cpfInput, telefoneInput, cidadeInput, enderecoInput, numeroInput, cepInput, senhaInput, confirmarSenhaInput];
        allInputs.forEach(input => {
            if (input) input.classList.remove("input-error");
        });

        let hasError = false;

        if (nomeInput && nomeInput.value.trim() === "") {
            nomeInput.classList.add("input-error");
            triggerShake(nomeInput);
            hasError = true;
        }

        if (emailInput && emailInput.value.trim() === "") {
            emailInput.classList.add("input-error");
            triggerShake(emailInput);
            hasError = true;
        }

        if (senhaInput && senhaInput.value === "") {
            senhaInput.classList.add("input-error");
            triggerShake(senhaInput);
            hasError = true;
        }

        if (confirmarSenhaInput && confirmarSenhaInput.value === "") {
            confirmarSenhaInput.classList.add("input-error");
            triggerShake(confirmarSenhaInput);
            hasError = true;
        }

        if (hasError) {
            showToast("Preencha os campos obrigatórios.", "error");
            return;
        }

        
        if (senhaInput.value !== confirmarSenhaInput.value) {
            senhaInput.classList.add("input-error");
            confirmarSenhaInput.classList.add("input-error");
            triggerShake(senhaInput);
            triggerShake(confirmarSenhaInput);
            showToast("As senhas não coincidem.", "error");
            return;
        }

       
        const newUser = {
            nome: nomeInput.value.trim(),
            email: emailInput.value.trim().toLowerCase(),
            cpf: cpfInput ? cpfInput.value.trim() : "",
            telefone: telefoneInput ? telefoneInput.value.trim() : "",
            cidade: cidadeInput ? cidadeInput.value.trim() : "",
            endereco: enderecoInput ? enderecoInput.value.trim() : "",
            senha: senhaInput.value
        };

        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

       
        if (registeredUsers.some(user => user.email === newUser.email)) {
            emailInput.classList.add("input-error");
            triggerShake(emailInput);
            showToast("Este e-mail já está cadastrado.", "error");
            return;
        }

        
        registeredUsers.push({
            nome: newUser.nome,
            email: newUser.email,
            password: newUser.senha
        });
        localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

        
        localStorage.setItem("signupSuccess", "true");
        showToast("Cadastro realizado! Redirecionando...", "success");

        const submitButton = formCadastro.querySelector("button[type='submit']");
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Carregando...";
        }

        window.location.href = "login.html";
    });
}

function triggerShake(element) {
    if (!element) return;
    element.classList.remove("shake-anim");
    void element.offsetWidth;
    element.classList.add("shake-anim");
    setTimeout(() => {
        element.classList.remove("shake-anim");
    }, 400);
}