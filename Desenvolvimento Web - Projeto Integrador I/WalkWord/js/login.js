const form = document.getElementById("formulario_login");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Erro na validação");
    } else {
        alert("Formulário enviado!");
        console.log({
            email: email,
            password: password
        });
    }
});