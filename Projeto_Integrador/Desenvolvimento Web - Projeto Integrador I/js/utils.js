// ===============================================
// FUNÇÕES UTILITÁRIAS COMPARTILHADAS
// ===============================================

// Mostrar mensagem de erro com SweetAlert2
function mostrarMensagemErro(mensagem) {
    Swal.fire({
        icon: 'error',
        title: 'Erro na Validação',
        text: mensagem,
        confirmButtonColor: '#dc3545',
        confirmButtonText: 'OK'
    });
}

// Mostrar mensagem de sucesso
function mostrarMensagemSucesso(mensagem, titulo = 'Sucesso!') {
    return Swal.fire({
        icon: 'success',
        title: titulo,
        text: mensagem,
        confirmButtonColor: '#2D5431',
        confirmButtonText: 'OK'
    });
}

// Limpar mensagem de erro
function limparMensagemErro() {
    // Com SweetAlert2, a mensagem desaparece automaticamente
    // Esta função é mantida para compatibilidade
}

// Limpar erros de múltiplos inputs
function limparErros(seletores = null) {
    limparMensagemErro();

    let inputs;
    if (seletores) {
        // Se passou seletores específicos
        inputs = seletores.map(sel => document.getElementById(sel) || document.querySelector(sel)).filter(el => el);
    } else {
        // Limpar todos os inputs
        inputs = document.querySelectorAll('input');
    }

    inputs.forEach(input => {
        if (input) {
            input.classList.remove('erro');
        }
    });
}

// Adicionar listener para remover erro ao digitar
function adicionarListenerRemoverErro(seletores) {
    seletores.forEach(sel => {
        const elemento = document.getElementById(sel) || document.querySelector(sel);
        if (elemento) {
            elemento.addEventListener('input', function() {
                this.classList.remove('erro');
                limparMensagemErro();
            });
        }
    });
}

// ===============================================
// VALIDAÇÕES
// ===============================================

// Validar formato de email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validar formato de telefone
function validarTelefone(telefone) {
    const regex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
    const apenasNumeros = telefone.replace(/\D/g, '');
    return apenasNumeros.length >= 10 && apenasNumeros.length <= 11;
}

// Validar formato de CEP
function validarCEP(cep) {
    const regex = /^\d{5}-\d{3}$/;
    const apenasNumeros = cep.replace(/\D/g, '');
    return regex.test(cep) || apenasNumeros.length === 8;
}

// ===============================================
// MÁSCARAS (IMask)
// ===============================================

// Inicializar máscaras com IMask
function inicializarMascaras() {
    // Máscara de telefone: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    const inputTelefone = document.getElementById('inputTelefone');
    if (inputTelefone) {
        IMask(inputTelefone, {
            mask: [
                {
                    mask: '(00) 00000-0000',
                    regex: /^(\d{0,2})(\d{0,5})(\d{0,4})$/,
                    prepare: function(appended) {
                        return appended === ')' ? '' : appended;
                    }
                },
                {
                    mask: '(00) 0000-0000',
                    regex: /^(\d{0,2})(\d{0,4})(\d{0,4})$/,
                    prepare: function(appended) {
                        return appended === ')' ? '' : appended;
                    }
                }
            ]
        });
    }

    // Máscara de CEP: XXXXX-XXX
    const inputCep = document.getElementById('inputCep');
    if (inputCep) {
        IMask(inputCep, {
            mask: '00000-000'
        });
    }

    // Máscara de número do cartão: XXXX XXXX XXXX XXXX
    const inputCartao = document.getElementById('inputNumeroCartao');
    if (inputCartao) {
        IMask(inputCartao, {
            mask: '0000 0000 0000 0000'
        });
    }
}

// Aplicar máscara de telefone (fallback se IMask falhar)
function aplicarMascaraTelefone(input) {
    let valor = input.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);
    
    if (valor.length <= 10) {
        valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
        valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    
    input.value = valor;
}

// Aplicar máscara de CEP (fallback se IMask falhar)
function aplicarMascaraCEP(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    if (valor.length > 8) valor = valor.slice(0, 8); // Limitar a 8 dígitos
    valor = valor.replace(/(\d{5})(\d{0,3})/, '$1-$2');
    input.value = valor;
}

// Aplicar máscara de cartão (fallback se IMask falhar)
function aplicarMascaraCartao(input) {
    let valor = input.value.replace(/\s/g, '');
    valor = valor.replace(/\D/g, '');
    
    if (valor.length > 16) {
        valor = valor.slice(0, 16);
    }
    
    valor = valor.replace(/(\d{4})/g, '$1 ').trim();
    input.value = valor;
}

// ===============================================
// LOCALSTORAGE
// ===============================================

// Limpar dados específicos do localStorage
function limparDadosStorage(chaves) {
    if (Array.isArray(chaves)) {
        chaves.forEach(chave => localStorage.removeItem(chave));
    } else {
        localStorage.removeItem(chaves);
    }
}

// ===============================================
// VALIDAÇÕES AVANÇADAS (USANDO LAÇOS)
// ===============================================

// Validar múltiplos campos usando regras definidas
function validarCamposComRegras(regras) {
    let temErro = false;
    
    regras.forEach(regra => {
        const elemento = document.getElementById(regra.campo) || document.querySelector(regra.campo);
        if (!elemento) return;
        
        const valor = elemento.value.trim();
        
        // Pular validação se campo estiver vazio e não for obrigatório
        if (!valor && !regra.obrigatorio) {
            elemento.classList.remove('erro');
            return;
        }
        
        // Validar se é obrigatório e está vazio
        if (regra.obrigatorio && !valor) {
            elemento.classList.add('erro');
            temErro = true;
            return;
        }
        
        // Se há valor e há uma função de validação específica
        if (valor && regra.validar && typeof regra.validar === 'function') {
            if (!regra.validar(valor)) {
                elemento.classList.add('erro');
                temErro = true;
            } else {
                elemento.classList.remove('erro');
            }
        }
        
        // Validar comprimento mínimo
        if (valor && regra.minLength !== undefined && valor.length < regra.minLength) {
            elemento.classList.add('erro');
            temErro = true;
        }
        
        // Validar padrão de palavras (ex: nome completo deve ter pelo menos 2 palavras)
        if (valor && regra.minPalavras !== undefined) {
            const palavraCount = valor.trim().split(/\s+/).filter(p => p.length > 0).length;
            if (palavraCount < regra.minPalavras) {
                elemento.classList.add('erro');
                temErro = true;
            }
        }
    });
    
    return !temErro;
}

// Validar se um valor é um número válido (apenas dígitos)
function validarApenasDigitos(valor) {
    return /^\d+$/.test(valor);
}

// Validar se um valor tem apenas letras e espaços
function validarLetrasEspacos(valor) {
    return /^[a-zA-Z\sÀ-ÿ]+$/.test(valor);
}

