```mermaid

sequenceDiagram
    autonumber
    actor Usuario as Usuário
    participant Front as Frontend (App/Web)
    participant Back as Backend / BD

    note over Usuario, Back: FASE 1: Autenticação
    
    Usuario->>Front: Acessar plataforma
    Front-->>Usuario: Exibir tela inicial / Login
    
    alt Não possui conta
        Usuario->>Front: Preencher dados de cadastro
        Front->>Back: Criar nova conta
        Back-->>Front: Confirmação de cadastro
    else Já possui conta
        Usuario->>Front: Inserir credenciais (Login)
    end
    
    Front->>Back: Autenticar usuário
    Back-->>Front: Token de acesso aprovado
    Front->>Front: Entrar na Home

    note over Usuario, Back: FASE 2: Navegação e Seleção de Produtos
    
    loop Busca de Produtos
        Usuario->>Front: Buscar ou navegar por produtos
        Usuario->>Front: Aplicar filtros (tamanho, cor, estado, preço)
        Front->>Back: Requisitar produtos filtrados
        Back-->>Front: Retornar lista de produtos
        Front-->>Usuario: Listar produtos na tela
    end

    Usuario->>Front: Selecionar um produto
    Front->>Back: Requisitar detalhes do produto e recomendações
    Back->>Back: IA processa produtos relacionados
    Back-->>Front: Retornar dados (fotos, descrição, preço) + recomendações
    Front-->>Usuario: Exibir página do produto e recomendações da IA

    note over Usuario, Back: FASE 3: Gestão do Carrinho
    
    alt Adicionar ao carrinho? Sim
        Usuario->>Front: Adicionar produto ao carrinho
        Front->>Front: Atualizar visualização do carrinho
        Usuario->>Front: Alterar quantidade ou remover itens (opcional)
    else Adicionar ao carrinho? Não
        Usuario->>Front: Voltar para busca/navegação
    end

    note over Usuario, Back: FASE 4: Checkout e Pagamento
    
    Usuario->>Front: Finalizar compra (Ir para checkout)
    Usuario->>Front: Informar endereço de entrega
    
    loop Processo de Pagamento
        Usuario->>Front: Escolher forma de pagamento (Pix, Cartão, Boleto)
        Usuario->>Front: Confirmar compra
        Front->>Back: Processar pagamento
        
        alt Pagamento Recusado
            Back-->>Front: Erro no pagamento
            Front-->>Usuario: Exibir erro e solicitar nova forma de pagamento
        end
    end
    
    note over Back: Pagamento Aprovado

    note over Usuario, Back: FASE 5: Finalização do Pedido
    
    Back->>Back: Gerar pedido
    Back->>Back: Atualizar estoque dos produtos
    Back->>Back: Salvar dados no Banco de Dados
    Back->>Front: Enviar confirmação e resumo do pedido
    Front-->>Usuario: Enviar confirmação (E-mail/Notificação)
    Front-->>Usuario: Exibir resumo do pedido na tela (Fim)