// Validação de campos do formulário
function validarFormulario() {
    // Limpar mensagens de erro anteriores
    limparErros();

    // Definir regras de validação
    const regras = [
        { campo: 'inputNome', obrigatorio: true, minPalavras: 2 },
        { campo: 'inputEmail', obrigatorio: true, validar: validarEmail },
        { campo: 'inputTelefone', obrigatorio: true, validar: validarTelefone },
        { campo: 'inputCep', obrigatorio: true, validar: validarCEP },
        { campo: 'inputEndereco', obrigatorio: true },
        { campo: 'inputNumero', obrigatorio: true },
        { campo: 'inputBairro', obrigatorio: true },
        { campo: 'inputEstado', obrigatorio: true },
        { campo: 'inputCidade', obrigatorio: true }
    ];

    // Validar usando regras em loop
    const ehValido = validarCamposComRegras(regras);

    // Mostrar mensagem de erro se necessário
    if (!ehValido) {
        mostrarMensagemErro('Por favor, preencha todos os campos corretamente.');
    }

    return ehValido;
}



// Adicionar listener ao botão de continuar
document.addEventListener('DOMContentLoaded', function() {
    const botaoContinuar = document.querySelector('button[type="button"]');
    
    if (botaoContinuar) {
        botaoContinuar.onclick = function(event) {
            event.preventDefault();
            
            if (validarFormulario()) {
                // Salvar dados no localStorage
                salvarDados();
                window.location.href = '../pages/second.html';
            }
        };
    }

    // Aplicar máscaras aos inputs com IMask
    inicializarMascaras();

    // Remover erro ao digitar
    adicionarListenerRemoverErro(['inputNome', 'inputEmail', 'inputTelefone', 'inputCep', 'inputEndereco', 'inputNumero', 'inputBairro', 'inputEstado', 'inputCidade']);
});



// Salvar dados no localStorage para recuperar depois se necessário
function salvarDados() {
    const nome = document.getElementById('inputNome').value;
    const email = document.getElementById('inputEmail').value;
    const telefone = document.getElementById('inputTelefone').value;
    const cep = document.getElementById('inputCep').value;
    const endereco = document.getElementById('inputEndereco').value;
    const numero = document.getElementById('inputNumero').value;
    const complemento = document.getElementById('inputComplemento').value;
    const bairro = document.getElementById('inputBairro').value;
    const estado = document.getElementById('inputEstado').value;
    const cidade = document.getElementById('inputCidade').value;

    const dados = {
        nome,
        email,
        telefone,
        cep,
        endereco,
        numero,
        complemento,
        bairro,
        estado,
        cidade
    };
    
    localStorage.setItem('enderecoEntrega', JSON.stringify(dados));
}    
