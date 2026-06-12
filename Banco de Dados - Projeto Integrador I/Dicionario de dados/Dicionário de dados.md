**CLIENTE**

* cliente_id: identificador único de cada cliente no sistema
* nome_cliente: nome completo do cliente
* cpf: número do CPF do cliente (identificação única)
* senha: senha de acesso do cliente ao sistema
* dt_cadastro: data e hora em que o cliente foi cadastrado



**EMAIL**

* email_id: identificador único do email
* end_email: endereço de email do cliente
* principal: indica se é o email principal do cliente (true/false)
* fk_cliente_id: identifica a qual cliente o email pertence



**ENDERECO**

* endereco_id: identificador único do endereço
* cidade: cidade do endereço
* bairro: bairro do endereço
* rua: nome da rua
* numero: número do imóvel
* complemento: informação adicional (ex: apartamento, bloco)
* cep: código postal do endereço



**ENDERECO_CLIENTE (N:N)**

* fk_cliente_id: identifica o cliente relacionado ao endereço
* fk_endereco_id: identifica o endereço relacionado ao cliente



**PRODUTO**

* produto_id: identificador único do produto
* nome_produto: nome do produto
* descricao: descrição detalhada do produto



**PRODUTO_VARIACAO**

* produto_variacao_id: identificador único da variação do produto
* fk_produto_id: identifica a qual produto a variação pertence
* cor: cor da variação do produto
* tamanho: tamanho da variação
* preco: preço atual da variação do produto



**PEDIDO**

* pedido_id: identificador único do pedido
* fk_cliente_id: identifica o cliente que realizou o pedido
* fk_endereco_id: identifica o endereço onde o pedido será entregue
* dt_pedido: data e hora em que o pedido foi realizado
* status: situação atual do pedido (ex: pendente, pago, enviado, entregue)



**ITENS_PEDIDO**



* item_pedido_id: identificador único do item do pedido
* fk_pedido_id: identifica a qual pedido o item pertence
* fk_produto_variacao_id: identifica qual produto/variação foi comprado
* quantidade: quantidade do produto no pedido
* preco_unitario: preço do produto no momento da compra



**PAGAMENTO**

* pagamento_id: identificador único do pagamento
* fk_pedido_id: identifica a qual pedido o pagamento está relacionado
* metodo: forma de pagamento (ex: cartão, pix, boleto)
* valor: valor total pago
* status: situação do pagamento (pendente, pago, recusado)
* dt_pagamento: data e hora em que o pagamento foi realizado



**MOVIMENTACAO_ESTOQUE**

* movimentacao_estoque_id: identificador único da movimentação de estoque
* fk_produto_variacao_id: identifica a variação do produto movimentada
* tipo: tipo da movimentação (entrada ou saída)
* quantidade: quantidade movimentada
* dt_movimentacao: data e hora da movimentação
