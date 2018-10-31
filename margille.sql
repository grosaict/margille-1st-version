SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "-03:00";


-- Base de Dados: margille
--
CREATE DATABASE IF NOT EXISTS margille DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE margille;


-- Estrutura da tabela de cliente

CREATE TABLE IF NOT EXISTS tb_client (
  id_client int NOT NULL AUTO_INCREMENT,
  name_client varchar(100) NOT NULL,
  phone_nro bigint(11) NOT NULL,
  email varchar(100) NOT NULL,
  pwd varchar(8) NOT NULL,
  PRIMARY KEY (id_client)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

-- Inserção dados de teste na tabela de cliente

INSERT INTO tb_client(name_client, phone_nro, email, pwd)
		VALUES	('Cliente 01', 51111222333, 'mail_01@mail.com', 'pwd_01'),
        		('Cliente 02', 51444555666, 'mail_02@mail.com', 'pwd_02'),
            ('Cliente 03', 51777888999, 'mail_03@mail.com', 'pwd_03');



-- Estrutura da tabela de produtos

CREATE TABLE IF NOT EXISTS tb_product (
  id_product int NOT NULL AUTO_INCREMENT,
  product_tag varchar(30) NOT NULL,
  product_description varchar(100),
  product_price decimal(7,2) NOT NULL,
  PRIMARY KEY (id_product)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

-- Inserção dados de teste na tabela de produtos

INSERT INTO tb_product(product_tag, product_description, product_price)
		VALUES	('Produto 01', 'detalhe produto 01', 100.00),
        		('Produto 02', 'detalhe produto 02', 1000.00),
            ('Produto 03', 'detalhe produto 03', 10000.00);



-- Estrutura da tabela de pedidos

CREATE TABLE IF NOT EXISTS tb_order (
  id_order int NOT NULL UNIQUE AUTO_INCREMENT,
  id_client int NOT NULL,
  order_status smallint,            --  1 - done / 2 - cancelled
  order_amount decimal(9,2) NOT NULL,
  PRIMARY KEY (id_order, id_client),
  FOREIGN KEY (id_client) REFERENCES tb_client(id_client)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

-- Inserção dados de teste na tabela de pedidos

INSERT INTO tb_order(id_client, order_status, order_amount)
		VALUES	(1, 1, 32100.00),
        		(2, 1, 32100.00),
            (3, 1, 32100.00);


-- Estrutura da tabela de produtos do pedido

CREATE TABLE IF NOT EXISTS tb_product_order (
  id_order int NOT NULL,
  id_product int NOT NULL,
  qtd_product int(3) NOT NULL,
  product_amount decimal(9,2) NOT NULL,
  PRIMARY KEY (id_order,id_product),
  FOREIGN KEY (id_order) REFERENCES tb_order(id_order),
  FOREIGN KEY (id_product) REFERENCES tb_product(id_product)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Inserção dados de teste na tabela de produtos do pedido

INSERT INTO tb_product_order(id_order, id_product, qtd_product, product_amount)
		VALUES	(1, 1, 1, 100.00),
        		(1, 2, 2, 2000.00),
            (1, 3, 3, 30000.00),
            (2, 1, 1, 100.00),
        		(2, 2, 2, 2000.00),
            (2, 3, 3, 30000.00),
            (3, 1, 1, 100.00),
        		(3, 2, 2, 2000.00),
            (3, 3, 3, 30000.00);