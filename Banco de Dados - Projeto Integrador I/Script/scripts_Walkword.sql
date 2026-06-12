-- ==========================  ENUMS  ===========================

CREATE TYPE tipo_movimentacao_enum AS ENUM ('entrada', 'saida');
CREATE TYPE status_pedido_enum AS ENUM ('pendente', 'pago', 'enviado', 'entregue', 'cancelado');
CREATE TYPE status_pagamento_enum AS ENUM ('pendente', 'pago', 'recusado');


-- ===========================  TABELAS  ==========================

CREATE TABLE cliente (
    cliente_id SERIAL PRIMARY KEY,
    nome_cliente VARCHAR(150) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    dt_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE email (
    email_id SERIAL PRIMARY KEY,
    end_email VARCHAR(255) NOT NULL UNIQUE,
    fk_cliente_id INT NOT NULL,
    principal BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (fk_cliente_id)
        REFERENCES cliente(cliente_id)
        ON DELETE CASCADE
);

CREATE TABLE endereco (
    endereco_id SERIAL PRIMARY KEY,
    cidade VARCHAR(100) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    rua VARCHAR(150) NOT NULL,
    numero VARCHAR(20) NOT NULL,
    complemento VARCHAR(150),
    cep VARCHAR(10) NOT NULL
);

CREATE TABLE endereco_cliente (
    fk_cliente_id INT NOT NULL,
    fk_endereco_id INT NOT NULL,

    PRIMARY KEY (fk_cliente_id, fk_endereco_id),

    FOREIGN KEY (fk_cliente_id)
        REFERENCES cliente(cliente_id)
        ON DELETE CASCADE,

    FOREIGN KEY (fk_endereco_id)
        REFERENCES endereco(endereco_id)
        ON DELETE CASCADE
);

CREATE TABLE produto (
    produto_id SERIAL PRIMARY KEY,
    nome_produto VARCHAR(150) NOT NULL,
    descricao TEXT
);

CREATE TABLE produto_variacao (
    produto_variacao_id SERIAL PRIMARY KEY,
    fk_produto_id INT NOT NULL,
    cor VARCHAR(50) NOT NULL,
    tamanho VARCHAR(50) NOT NULL,
    preco NUMERIC(10,2) NOT NULL CHECK (preco >= 0),

    FOREIGN KEY (fk_produto_id)
        REFERENCES produto(produto_id)
        ON DELETE CASCADE
);

CREATE TABLE pedido (
    pedido_id SERIAL PRIMARY KEY,
    fk_cliente_id INT NOT NULL,
    fk_endereco_id INT NOT NULL,
    dt_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status status_pedido_enum DEFAULT 'pendente',

    FOREIGN KEY (fk_cliente_id)
        REFERENCES cliente(cliente_id),

    FOREIGN KEY (fk_endereco_id)
        REFERENCES endereco(endereco_id)
);

CREATE TABLE itens_pedido (
    item_pedido_id SERIAL PRIMARY KEY,
    fk_pedido_id INT NOT NULL,
    fk_produto_variacao_id INT NOT NULL,
    quantidade INT NOT NULL CHECK (quantidade > 0),
    preco_unitario NUMERIC(10,2) NOT NULL CHECK (preco_unitario >= 0),

    FOREIGN KEY (fk_pedido_id)
        REFERENCES pedido(pedido_id)
        ON DELETE CASCADE,

    FOREIGN KEY (fk_produto_variacao_id)
        REFERENCES produto_variacao(produto_variacao_id)
);

CREATE TABLE pagamento (
    pagamento_id SERIAL PRIMARY KEY,
    fk_pedido_id INT NOT NULL,
    metodo VARCHAR(50) NOT NULL,
    valor NUMERIC(10,2) NOT NULL CHECK (valor >= 0),
    status status_pagamento_enum DEFAULT 'pendente',
    dt_pagamento TIMESTAMP,

    FOREIGN KEY (fk_pedido_id)
        REFERENCES pedido(pedido_id)
        ON DELETE CASCADE
);

CREATE TABLE movimentacao_estoque (
    movimentacao_estoque_id SERIAL PRIMARY KEY,
    fk_produto_variacao_id INT NOT NULL,
    tipo tipo_movimentacao_enum NOT NULL,
    quantidade INT NOT NULL CHECK (quantidade > 0),
    dt_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (fk_produto_variacao_id)
        REFERENCES produto_variacao(produto_variacao_id)
);


-- ========================  FUNCTIONS  =============================

CREATE OR REPLACE FUNCTION func_total_gasto_cliente(p_cliente_id INT)

RETURNS NUMERIC AS
$$

DECLARE valor_total NUMERIC;

BEGIN

    SELECT COALESCE(SUM(pg.valor), 0)
    INTO valor_total
    FROM pedido p
    JOIN pagamento pg ON p.pedido_id = pg.fk_pedido_id
    WHERE p.fk_cliente_id = p_cliente_id
      AND pg.status = 'pago';

    RETURN valor_total;

END;

$$ LANGUAGE plpgsql;


-- ==========================  PROCEDURES  ===========================

CREATE OR REPLACE PROCEDURE proc_registrar_pagamento(par_pedido_id INT, par_metodo VARCHAR, par_valor NUMERIC)
LANGUAGE plpgsql
AS
$$

BEGIN

    INSERT INTO pagamento (fk_pedido_id, metodo, valor, status, dt_pagamento)
    VALUES (par_pedido_id, par_metodo, par_valor, 'pago', NOW());

    UPDATE pedido
    SET status = 'pago'
    WHERE pedido_id = par_pedido_id;

END;

$$;




-- =========================  INSERTS  ============================

INSERT INTO cliente (cliente_id, nome_cliente, cpf, senha, dt_cadastro)
VALUES
(1, 'João Silva', '12345678901', 'senha123', NOW()),
(2, 'Maria Oliveira', '12345678902', 'senha123', NOW()),
(3, 'Carlos Souza', '12345678903', 'senha123', NOW()),
(4, 'Ana Lima', '12345678904', 'senha123', NOW()),
(5, 'Pedro Santos', '12345678905', 'senha123', NOW()),
(6, 'Juliana Costa', '12345678906', 'senha123', NOW()),
(7, 'Lucas Almeida', '12345678907', 'senha123', NOW()),
(8, 'Fernanda Rocha', '12345678908', 'senha123', NOW()),
(9, 'Ricardo Mendes', '12345678909', 'senha123', NOW()),
(10, 'Patrícia Gomes', '12345678910', 'senha123', NOW()),
(11, 'Gabriel Martins', '12345678911', 'senha123', NOW()),
(12, 'Camila Ribeiro', '12345678912', 'senha123', NOW()),
(13, 'Bruno Carvalho', '12345678913', 'senha123', NOW()),
(14, 'Larissa Fernandes', '12345678914', 'senha123', NOW()),
(15, 'Rafael Moreira', '12345678915', 'senha123', NOW()),
(16, 'Aline Barbosa', '12345678916', 'senha123', NOW()),
(17, 'Thiago Cardoso', '12345678917', 'senha123', NOW()),
(18, 'Beatriz Teixeira', '12345678918', 'senha123', NOW()),
(19, 'Eduardo Nunes', '12345678919', 'senha123', NOW()),
(20, 'Mariana Alves', '12345678920', 'senha123', NOW());


INSERT INTO email (email_id, end_email, fk_cliente_id, principal)
VALUES
(1, 'joao.silva@email.com', 1, TRUE),
(2, 'maria.oliveira@email.com', 2, TRUE),
(3, 'carlos.souza@email.com', 3, TRUE),
(4, 'ana.lima@email.com', 4, TRUE),
(5, 'pedro.santos@email.com', 5, TRUE),
(6, 'juliana.costa@email.com', 6, TRUE),
(7, 'lucas.almeida@email.com', 7, TRUE),
(8, 'fernanda.rocha@email.com', 8, TRUE),
(9, 'ricardo.mendes@email.com', 9, TRUE),
(10, 'patricia.gomes@email.com', 10, TRUE),
(11, 'gabriel.martins@email.com', 11, TRUE),
(12, 'camila.ribeiro@email.com', 12, TRUE),
(13, 'bruno.carvalho@email.com', 13, TRUE),
(14, 'larissa.fernandes@email.com', 14, TRUE),
(15, 'rafael.moreira@email.com', 15, TRUE),
(16, 'aline.barbosa@email.com', 16, TRUE),
(17, 'thiago.cardoso@email.com', 17, TRUE),
(18, 'beatriz.teixeira@email.com', 18, TRUE),
(19, 'eduardo.nunes@email.com', 19, TRUE),
(20, 'mariana.alves@email.com', 20, TRUE);


INSERT INTO endereco (endereco_id, cidade, bairro, rua, numero, complemento, cep)
VALUES
(1, 'São Paulo', 'Centro', 'Rua das Flores', '101', 'Apartamento 12', '01000001'),
(2, 'Sorocaba', 'Campolim', 'Rua Europa', '220', 'Casa', '18000002'),
(3, 'Campinas', 'Taquaral', 'Rua Azul', '55', 'Bloco A', '13000003'),
(4, 'Curitiba', 'Batel', 'Rua XV', '89', 'Apartamento 9', '80000004'),
(5, 'Rio de Janeiro', 'Copacabana', 'Av Atlântica', '300', 'Cobertura', '22000005'),
(6, 'Belo Horizonte', 'Savassi', 'Rua Minas', '77', 'Casa', '30000006'),
(7, 'Fortaleza', 'Meireles', 'Rua do Sol', '400', 'Apartamento 3', '60000007'),
(8, 'Salvador', 'Barra', 'Rua Bahia', '500', 'Casa', '40000008'),
(9, 'Brasília', 'Asa Sul', 'Quadra 101', '10', 'Bloco B', '70000009'),
(10, 'Porto Alegre', 'Moinhos', 'Rua Bento', '999', 'Apartamento 15', '90000010'),
(11, 'Florianópolis', 'Centro', 'Rua Beira Mar', '250', 'Casa', '88000011'),
(12, 'Recife', 'Boa Viagem', 'Rua Oceano', '140', 'Apartamento 5', '50000012'),
(13, 'Goiânia', 'Setor Bueno', 'Rua Goiás', '700', 'Casa', '74000013'),
(14, 'Manaus', 'Centro', 'Rua Amazonas', '88', 'Apartamento 1', '69000014'),
(15, 'Natal', 'Ponta Negra', 'Rua do Farol', '33', 'Casa', '59000015');


INSERT INTO endereco_cliente (fk_cliente_id, fk_endereco_id)
VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3),
(5, 3),
(6, 4),
(7, 5),
(8, 5),
(9, 5),
(10, 6),
(11, 7),
(12, 7),
(13, 8),
(14, 9),
(15, 10),
(16, 10),
(17, 11),
(18, 12),
(19, 12),
(20, 13);


INSERT INTO pedido (pedido_id, fk_cliente_id, fk_endereco_id, dt_pedido, status)
VALUES
(1, 1, 1, NOW(), 'pago'),
(2, 2, 1, NOW(), 'entregue'),
(3, 3, 2, NOW(), 'pendente'),
(4, 4, 3, NOW(), 'pago'),
(5, 5, 3, NOW(), 'enviado'),
(6, 6, 4, NOW(), 'cancelado'),
(7, 7, 5, NOW(), 'pago'),
(8, 8, 5, NOW(), 'pago'),
(9, 9, 5, NOW(), 'entregue'),
(10, 10, 6, NOW(), 'pendente'),
(11, 11, 7, NOW(), 'pago'),
(12, 12, 7, NOW(), 'entregue'),
(13, 13, 8, NOW(), 'pago'),
(14, 14, 9, NOW(), 'enviado'),
(15, 15, 10, NOW(), 'pago'),
(16, 16, 10, NOW(), 'pendente'),
(17, 17, 11, NOW(), 'pago'),
(18, 18, 12, NOW(), 'entregue'),
(19, 19, 12, NOW(), 'pago'),
(20, 20, 13, NOW(), 'pendente'),
(21, 1, 1, NOW(), 'pago'),
(22, 2, 1, NOW(), 'entregue'),
(23, 5, 3, NOW(), 'pago'),
(24, 7, 5, NOW(), 'pago'),
(25, 9, 5, NOW(), 'enviado'),
(26, 11, 7, NOW(), 'pendente'),
(27, 13, 8, NOW(), 'pago'),
(28, 15, 10, NOW(), 'entregue'),
(29, 18, 12, NOW(), 'pago'),
(30, 20, 13, NOW(), 'cancelado');


INSERT INTO itens_pedido (item_pedido_id, fk_pedido_id, fk_produto_variacao_id, quantidade, preco_unitario)
VALUES
(1, 1, 1, 2, 79.90),
(2, 2, 7, 1, 299.90),
(3, 3, 15, 1, 139.90),
(4, 4, 20, 2, 89.90),
(5, 5, 31, 1, 5999.90),
(6, 6, 5, 1, 119.90),
(7, 7, 24, 3, 39.90),
(8, 8, 35, 1, 1599.90),
(9, 9, 29, 1, 299.90),
(10, 10, 11, 2, 59.90),
(11, 11, 37, 1, 499.90),
(12, 12, 32, 1, 199.90),
(13, 13, 26, 1, 249.90),
(14, 14, 34, 1, 1299.90),
(15, 15, 21, 2, 69.90),
(16, 16, 10, 1, 199.90),
(17, 17, 30, 1, 279.90),
(18, 18, 40, 1, 3499.90),
(19, 19, 28, 2, 59.90),
(20, 20, 3, 1, 149.90),
(21, 21, 6, 2, 119.90),
(22, 22, 8, 1, 299.90),
(23, 23, 18, 1, 99.90),
(24, 24, 39, 1, 159.90),
(25, 25, 13, 2, 49.90),
(26, 26, 23, 1, 199.90),
(27, 27, 27, 1, 89.90),
(28, 28, 17, 2, 99.90),
(29, 29, 36, 1, 249.90),
(30, 30, 2, 1, 79.90);



INSERT INTO pagamento (pagamento_id, fk_pedido_id, metodo, valor, status, dt_pagamento)
VALUES
(1, 1, 'pix', 159.80, 'pago', NOW()),
(2, 2, 'cartao', 299.90, 'pago', NOW()),
(3, 4, 'pix', 179.80, 'pago', NOW()),
(4, 5, 'cartao', 5999.90, 'pago', NOW()),
(5, 7, 'boleto', 119.70, 'pago', NOW()),
(6, 8, 'pix', 1599.90, 'pago', NOW()),
(7, 9, 'cartao', 299.90, 'pago', NOW()),
(8, 11, 'pix', 499.90, 'pago', NOW()),
(9, 12, 'pix', 199.90, 'pago', NOW()),
(10, 13, 'boleto', 249.90, 'pago', NOW()),
(11, 14, 'cartao', 1299.90, 'pago', NOW()),
(12, 15, 'pix', 139.80, 'pago', NOW()),
(13, 17, 'pix', 279.90, 'pago', NOW()),
(14, 18, 'cartao', 3499.90, 'pago', NOW()),
(15, 19, 'pix', 119.80, 'pago', NOW()),
(16, 21, 'boleto', 239.80, 'pago', NOW()),
(17, 22, 'pix', 299.90, 'pago', NOW()),
(18, 23, 'pix', 99.90, 'pago', NOW()),
(19, 24, 'cartao', 159.90, 'pago', NOW()),
(20, 27, 'pix', 89.90, 'pago', NOW());




INSERT INTO movimentacao_estoque (movimentacao_estoque_id, fk_produto_variacao_id, tipo, quantidade, dt_movimentacao)
VALUES
(1, 1, 'entrada', 50, NOW()),
(2, 2, 'entrada', 50, NOW()),
(3, 3, 'entrada', 40, NOW()),
(4, 4, 'entrada', 40, NOW()),
(5, 5, 'entrada', 30, NOW()),
(6, 6, 'entrada', 30, NOW()),
(7, 7, 'entrada', 25, NOW()),
(8, 8, 'entrada', 25, NOW()),
(9, 9, 'entrada', 20, NOW()),
(10, 10, 'entrada', 20, NOW()),
(11, 11, 'entrada', 35, NOW()),
(12, 12, 'entrada', 35, NOW()),
(13, 13, 'entrada', 60, NOW()),
(14, 14, 'entrada', 60, NOW()),
(15, 15, 'entrada', 25, NOW()),
(16, 16, 'entrada', 25, NOW()),
(17, 17, 'entrada', 15, NOW()),
(18, 18, 'entrada', 15, NOW()),
(19, 19, 'entrada', 20, NOW()),
(20, 20, 'entrada', 20, NOW()),
(21, 31, 'saida', 1, NOW()),
(22, 35, 'saida', 1, NOW()),
(23, 40, 'saida', 1, NOW()),
(24, 7, 'saida', 1, NOW()),
(25, 1, 'saida', 2, NOW()),
(26, 24, 'saida', 3, NOW()),
(27, 37, 'saida', 1, NOW()),
(28, 21, 'saida', 2, NOW()),
(29, 29, 'saida', 1, NOW()),
(30, 39, 'saida', 1, NOW());




INSERT INTO produto (produto_id, nome_produto, descricao)
VALUES
(1, 'Camiseta Oversized', 'Camiseta oversized premium streetwear'),
(2, 'Calça Cargo', 'Calça cargo masculina'),
(3, 'Moletom Basic', 'Moletom básico unissex'),
(4, 'Tênis Urban', 'Tênis casual urbano'),
(5, 'Jaqueta Jeans', 'Jaqueta jeans azul'),
(6, 'Shorts Esportivo', 'Shorts esportivo dry fit'),
(7, 'Boné Street', 'Boné aba reta streetwear'),
(8, 'Camisa Social', 'Camisa social slim fit'),
(9, 'Vestido Casual', 'Vestido casual feminino'),
(10, 'Saia Midi', 'Saia midi moderna'),
(11, 'Blusa Cropped', 'Blusa cropped feminina'),
(12, 'Relógio Digital', 'Relógio digital esportivo'),
(13, 'Pulseira Minimalista', 'Pulseira metálica minimalista'),
(14, 'Óculos Escuros', 'Óculos escuros UV400'),
(15, 'Mochila Executiva', 'Mochila para notebook'),
(16, 'Carteira Couro', 'Carteira masculina couro'),
(17, 'Chinelo Slide', 'Chinelo slide confortável'),
(18, 'Perfume Essence', 'Perfume masculino importado'),
(19, 'Perfume Bloom', 'Perfume feminino floral'),
(20, 'Notebook Gamer', 'Notebook gamer RTX'),
(21, 'Mouse RGB', 'Mouse gamer RGB'),
(22, 'Teclado Mecânico', 'Teclado mecânico switch blue'),
(23, 'Monitor 27', 'Monitor 27 polegadas Full HD'),
(24, 'Cadeira Gamer', 'Cadeira gamer ergonômica'),
(25, 'Fone Bluetooth', 'Fone bluetooth premium'),
(26, 'Smartwatch Fit', 'Smartwatch fitness'),
(27, 'Caixa de Som', 'Caixa de som portátil'),
(28, 'Power Bank', 'Carregador portátil 20000mah'),
(29, 'Tablet Pro', 'Tablet para produtividade'),
(30, 'Suporte Notebook', 'Suporte ergonômico notebook');





(2, 1, 'Preto', 'M', 79.90),
(3, 2, 'Verde', '40', 149.90),
(4, 2, 'Preto', '42', 149.90),
(5, 3, 'Cinza', 'M', 119.90),
(6, 3, 'Cinza', 'G', 119.90),
(7, 4, 'Branco', '41', 299.90),
(8, 4, 'Preto', '42', 299.90),
(9, 5, 'Azul', 'M', 199.90),
(10, 5, 'Azul', 'G', 199.90),
(11, 6, 'Preto', 'M', 59.90),
(12, 6, 'Azul', 'G', 59.90),
(13, 7, 'Preto', 'Único', 49.90),
(14, 7, 'Branco', 'Único', 49.90),
(15, 8, 'Branco', 'M', 139.90),
(16, 8, 'Azul', 'G', 139.90),
(17, 9, 'Vermelho', 'P', 99.90),
(18, 9, 'Preto', 'M', 99.90),
(19, 10, 'Bege', 'M', 89.90),
(20, 10, 'Preto', 'G', 89.90),
(21, 11, 'Rosa', 'P', 69.90),
(22, 11, 'Branco', 'M', 69.90),
(23, 12, 'Preto', 'Único', 199.90),
(24, 13, 'Prata', 'Único', 39.90),
(25, 14, 'Preto', 'Único', 129.90),
(26, 15, 'Preto', 'Único', 249.90),
(27, 16, 'Marrom', 'Único', 89.90),
(28, 17, 'Branco', '40', 59.90),
(29, 18, 'Único', '100ml', 299.90),
(30, 19, 'Único', '100ml', 279.90),
(31, 20, 'Preto', '16GB', 5999.90),
(32, 21, 'Preto', 'Único', 199.90),
(33, 22, 'Preto', 'ABNT2', 349.90),
(34, 23, 'Preto', '27', 1299.90),
(35, 24, 'Preto', 'Único', 1599.90),
(36, 25, 'Branco', 'Único', 249.90),
(37, 26, 'Preto', 'Único', 499.90),
(38, 27, 'Azul', 'Único', 199.90),
(39, 28, 'Preto', '20000mah', 159.90),
(40, 29, 'Cinza', '128GB', 3499.90);



-- =========================  VIEWS  ============================

CREATE VIEW view_estoque_atual AS
SELECT pv.produto_variacao_id, p.nome_produto, pv.cor, pv.tamanho,
       SUM(CASE
               WHEN me.tipo = 'entrada' THEN me.quantidade
               WHEN me.tipo = 'saida' THEN -me.quantidade
           END) AS estoque_atual
FROM produto_variacao pv
INNER JOIN produto p ON pv.fk_produto_id = p.produto_id
INNER JOIN movimentacao_estoque me ON pv.produto_variacao_id = me.fk_produto_variacao_id
GROUP BY pv.produto_variacao_id, p.nome_produto, pv.cor, pv.tamanho;


CREATE VIEW view_faturamento AS
SELECT p.pedido_id,
       SUM(ip.quantidade * ip.preco_unitario) AS valor_total
FROM pedido p
INNER JOIN itens_pedido ip ON p.pedido_id = ip.fk_pedido_id
GROUP BY p.pedido_id;


CREATE VIEW view_join_total AS
SELECT c.cliente_id, c.nome_cliente, e.end_email,
       p.pedido_id, p.dt_pedido, p.status,
       pr.nome_produto, pv.cor, pv.tamanho,
       ip.quantidade, ip.preco_unitario,
       pg.metodo, pg.valor
FROM cliente c
INNER JOIN email e ON c.cliente_id = e.fk_cliente_id
INNER JOIN pedido p ON c.cliente_id = p.fk_cliente_id
INNER JOIN itens_pedido ip ON p.pedido_id = ip.fk_pedido_id
INNER JOIN produto_variacao pv ON ip.fk_produto_variacao_id = pv.produto_variacao_id
INNER JOIN produto pr ON pv.fk_produto_id = pr.produto_id
INNER JOIN pagamento pg ON p.pedido_id = pg.fk_pedido_id;


CREATE VIEW view_pedidos_completos AS
SELECT p.pedido_id, c.nome_cliente,
       pr.nome_produto, pv.cor, pv.tamanho,
       ip.quantidade, ip.preco_unitario,
       (ip.quantidade * ip.preco_unitario) AS subtotal,
       pg.metodo, pg.status AS status_pagamento,
       p.status AS status_pedido, p.dt_pedido
FROM pedido p
INNER JOIN cliente c ON p.fk_cliente_id = c.cliente_id
INNER JOIN itens_pedido ip ON p.pedido_id = ip.fk_pedido_id
INNER JOIN produto_variacao pv ON ip.fk_produto_variacao_id = pv.produto_variacao_id
INNER JOIN produto pr ON pv.fk_produto_id = pr.produto_id
INNER JOIN pagamento pg ON p.pedido_id = pg.fk_pedido_id;
