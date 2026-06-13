# Expansão dos Casos de Uso – WalkWord

---

## UC01 – Cadastrar-se

**Ator Principal:** Cliente

### Descrição
Permite que um novo usuário realize seu cadastro na plataforma WalkWord para utilizar as funcionalidades disponíveis.

### Pré-condições
- O sistema deve estar disponível.
- O usuário não pode possuir cadastro com o e-mail informado.

### Pós-condições
- Usuário cadastrado com sucesso.
- Usuário apto a realizar login.

### Fluxo Principal

1. O cliente acessa a opção de cadastro.
2. O sistema exibe o formulário de cadastro.
3. O cliente informa seus dados.
4. O sistema valida as informações.
5. O sistema registra o novo usuário.
6. O sistema confirma o cadastro.

### Fluxos Alternativos

**3a. E-mail já cadastrado**

- O sistema informa que o e-mail já está em uso.
- O cliente deve informar outro e-mail.

**3b. Campos obrigatórios não preenchidos**

- O sistema solicita a correção dos dados.
- O cliente preenche as informações faltantes.

### Fluxos de Exceção

**5e. Erro ao salvar cadastro**

- O sistema informa a ocorrência de um erro.
- O cadastro não é concluído.

---

## UC02 – Realizar Login

**Ator Principal:** Cliente

### Descrição
Permite que o usuário acesse sua conta por meio de suas credenciais.

### Pré-condições
- O usuário deve possuir cadastro ativo.

### Pós-condições
- Usuário autenticado no sistema.

### Fluxo Principal

1. O cliente acessa a tela de login.
2. O sistema solicita e-mail e senha.
3. O cliente informa os dados.
4. O sistema valida as credenciais.
5. O sistema autentica o usuário.
6. O sistema redireciona para a página inicial.

### Fluxos Alternativos

**4a. Senha incorreta**

- O sistema informa que a senha é inválida.
- O cliente pode realizar uma nova tentativa.

**4b. Usuário não encontrado**

- O sistema informa que não existe cadastro para o e-mail informado.

### Fluxos de Exceção

**4e. Falha no processo de autenticação**

- O sistema informa indisponibilidade temporária.
- O login não é realizado.

---
## UC03 – Recuperar Senha

**Ator Principal:** Cliente

### Descrição
Permite que o usuário redefina sua senha em caso de esquecimento.

### Pré-condições
- O usuário deve possuir cadastro no sistema.

### Pós-condições
- Nova senha registrada com sucesso.

### Fluxo Principal

1. O cliente seleciona a opção "Recuperar Senha".
2. O sistema solicita o e-mail cadastrado.
3. O cliente informa o e-mail.
4. O sistema envia um código ou link de recuperação.
5. O cliente redefine a senha.
6. O sistema confirma a alteração.

### Fluxos Alternativos

**3a. E-mail não encontrado**

- O sistema informa que o e-mail não está cadastrado.

### Fluxos de Exceção

**4e. Falha no envio do e-mail**

- O sistema informa erro temporário.
- O usuário deve tentar novamente.

---

## UC04 – Explorar Catálogo

**Ator Principal:** Cliente

### Descrição
Permite que o cliente navegue pelos produtos disponíveis na plataforma.

### Pré-condições
- O sistema deve possuir produtos cadastrados.

### Pós-condições
- Produtos exibidos ao cliente.

### Fluxo Principal

1. O cliente acessa o catálogo.
2. O sistema exibe os produtos disponíveis.
3. O cliente navega pelas categorias.
4. O cliente seleciona produtos para visualização.

### Fluxos Alternativos

**2a. Nenhum produto disponível**

- O sistema informa que não existem produtos cadastrados.

### Fluxos de Exceção

**2e. Falha ao carregar catálogo**

- O sistema informa erro de carregamento.
- O catálogo não é exibido.

---

## UC05 – Buscar Produtos

**Ator Principal:** Cliente

### Descrição
Permite localizar produtos específicos por meio de pesquisa textual.

### Pré-condições
- Produtos cadastrados no sistema.

### Pós-condições
- Resultados da pesquisa exibidos.

### Fluxo Principal

1. O cliente acessa a barra de pesquisa.
2. O cliente informa o nome ou característica do produto.
3. O sistema realiza a busca.
4. O sistema apresenta os resultados encontrados.

### Fluxos Alternativos

**3a. Nenhum produto encontrado**

- O sistema informa que não foram encontrados resultados.

### Fluxos de Exceção

**3e. Falha na pesquisa**

- O sistema informa erro interno.
- A pesquisa não é concluída.

---

## UC06 – Filtrar Produtos

**Ator Principal:** Cliente

### Descrição
Permite refinar a visualização dos produtos utilizando filtros específicos.

### Pré-condições
- Produtos disponíveis no catálogo.

### Pós-condições
- Produtos filtrados conforme os critérios selecionados.

### Fluxo Principal

1. O cliente seleciona os filtros desejados.
2. O sistema aplica os critérios informados.
3. O sistema atualiza a listagem de produtos.

### Fluxos Alternativos

**2a. Nenhum produto corresponde aos filtros**

- O sistema informa que não existem produtos compatíveis.

### Fluxos de Exceção

**2e. Erro ao aplicar filtros**

- O sistema informa erro interno.

---

## UC07 – Visualizar Produto

**Ator Principal:** Cliente

### Descrição
Permite visualizar informações detalhadas sobre um produto.

### Pré-condições
- O produto deve estar cadastrado.

### Pós-condições
- Informações do produto exibidas.

### Fluxo Principal

1. O cliente seleciona um produto.
2. O sistema exibe:
   - Nome;
   - Imagens;
   - Descrição;
   - Preço;
   - Informações ambientais.

### Fluxos Alternativos

**1a. Produto indisponível**

- O sistema informa que o produto não está disponível.

### Fluxos de Exceção

**2e. Falha ao carregar informações**

- O sistema informa erro interno.

---

## UC08 – Favoritar Produto

**Ator Principal:** Cliente

### Descrição
Permite salvar produtos para consulta posterior.

### Pré-condições
- Cliente autenticado.

### Pós-condições
- Produto adicionado à lista de favoritos.

### Fluxo Principal

1. O cliente acessa a página do produto.
2. O cliente seleciona a opção "Favoritar".
3. O sistema adiciona o produto à lista de favoritos.
4. O sistema confirma a operação.

### Fluxos Alternativos

**2a. Produto já favoritado**

- O sistema informa que o produto já está na lista.

### Fluxos de Exceção

**3e. Falha ao salvar favorito**

- O sistema informa erro interno.

---

## UC09 – Gerenciar Carrinho

**Ator Principal:** Cliente

### Descrição
Permite adicionar, remover ou alterar produtos no carrinho de compras.

### Pré-condições
- Produto disponível para compra.

### Pós-condições
- Carrinho atualizado.

### Fluxo Principal

1. O cliente adiciona um produto ao carrinho.
2. O sistema registra o item.
3. O cliente altera quantidades ou remove produtos.
4. O sistema atualiza o carrinho.

### Fluxos Alternativos

**1a. Produto sem estoque**

- O sistema informa indisponibilidade do produto.

### Fluxos de Exceção

**4e. Falha ao atualizar carrinho**

- O sistema informa erro interno.

---

## UC10 – Finalizar Compra

**Ator Principal:** Cliente

### Descrição
Permite concluir a compra dos produtos selecionados.

### Pré-condições
- Cliente autenticado.
- Carrinho contendo produtos.

### Pós-condições
- Pedido registrado no sistema.

### Fluxo Principal

1. O cliente acessa o carrinho.
2. O cliente seleciona a opção "Finalizar Compra".
3. O sistema apresenta o resumo do pedido.
4. O cliente informa os dados de entrega e pagamento.
5. O sistema processa o pagamento.
6. O sistema registra o pedido.
7. O sistema confirma a compra.

### Fluxos Alternativos

**5a. Pagamento recusado**

- O sistema informa a falha no pagamento.
- O cliente deve selecionar outro método.

**6a. Produto indisponível**

- O sistema remove o item indisponível do pedido.

### Fluxos de Exceção

**5e. Falha na comunicação com o serviço de pagamento**

- O sistema informa erro temporário.
- A compra não é concluída.

---

## UC11 – Visualizar Impacto Ambiental

**Ator Principal:** Cliente

### Descrição
Permite visualizar informações relacionadas aos benefícios ambientais da compra de produtos seminovos.

### Pré-condições
- O produto deve possuir dados ambientais cadastrados.

### Pós-condições
- Informações ambientais exibidas.

### Fluxo Principal

1. O cliente acessa os detalhes do produto.
2. O sistema exibe informações sobre:
   - Redução de emissão de carbono;
   - Reutilização de recursos;
   - Impacto ambiental positivo estimado.

### Fluxos Alternativos

**2a. Informações ambientais indisponíveis**

- O sistema informa a indisponibilidade dos dados.

### Fluxos de Exceção

**2e. Falha ao carregar informações ambientais**

- O sistema informa erro interno.

---

## UC12 – Gerenciar Produtos

**Ator Principal:** Administrador

### Descrição
Permite cadastrar, editar e remover produtos do catálogo.

### Pré-condições
- Administrador autenticado.

### Pós-condições
- Catálogo atualizado.

### Fluxo Principal

1. O administrador acessa o painel administrativo.
2. O sistema exibe as opções de gerenciamento.
3. O administrador cadastra, altera ou remove um produto.
4. O sistema salva as alterações.
5. O sistema confirma a operação.

### Fluxos Alternativos

**3a. Produto já cadastrado**

- O sistema informa duplicidade de cadastro.

### Fluxos de Exceção

**4e. Falha ao salvar alterações**

- O sistema informa erro interno.

---

## UC13 – Gerenciar Pedidos

**Ator Principal:** Administrador

### Descrição
Permite acompanhar e atualizar pedidos realizados pelos clientes.

### Pré-condições
- Pedido registrado no sistema.

### Pós-condições
- Pedido atualizado.

### Fluxo Principal

1. O administrador acessa a área de pedidos.
2. O sistema exibe os pedidos cadastrados.
3. O administrador seleciona um pedido.
4. O administrador atualiza seu status.
5. O sistema salva as alterações.

### Fluxos Alternativos

**4a. Pedido já finalizado**

- O sistema impede alterações indevidas.

### Fluxos de Exceção

**5e. Falha ao atualizar pedido**

- O sistema informa erro interno.

---

## UC14 – Gerenciar Usuários

**Ator Principal:** Administrador

### Descrição
Permite administrar os usuários cadastrados na plataforma.

### Pré-condições
- Administrador autenticado.

### Pós-condições
- Dados dos usuários atualizados.

### Fluxo Principal

1. O administrador acessa a área de usuários.
2. O sistema exibe os usuários cadastrados.
3. O administrador seleciona um usuário.
4. O administrador realiza edição, bloqueio ou remoção.
5. O sistema salva as alterações.

### Fluxos Alternativos

**3a. Usuário não encontrado**

- O sistema informa que o usuário não existe.

### Fluxos de Exceção

**5e. Falha ao atualizar usuário**

- O sistema informa erro interno.

---