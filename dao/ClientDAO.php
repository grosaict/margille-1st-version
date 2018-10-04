<?php
    include_once 'Client.php';
	include_once 'PDOFactory.php';

    class ClientDAO                 /*  AJUSTAR PASSAGEM DE PARÂMETROS, SQLs, .... */
    {
        public function inserir(Client $client)
        {
            $qInserir = "INSERT INTO tb_client(nome,preco) VALUES (:nome,:preco)";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qInserir);
            $comando->bindParam(":nome",$client->nome);
            $comando->bindParam(":preco",$client->preco);
            $comando->execute();
            $client->id = $pdo->lastInsertId();
            return $client;
        }

        public function deletar($id)
        {
            $qDeletar = "DELETE FROM tb_client WHERE id=:id";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qDeletar);
            $comando->bindParam(":id",$id);
            $comando->execute();
        }

        public function atualizar(Client $client)
        {
            $qAtualizar = "UPDATE tb_client SET nome=:nome, preco=:preco WHERE id=:id";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qAtualizar);
            $comando->bindParam(":nome",$client->nome);
            $comando->bindParam(":preco",$client->preco);
            $comando->bindParam(":id",$client->id);
            $comando->execute();        
        }

        public function listar()
        {
		    $query = 'SELECT * FROM tb_client';
    		$pdo = PDOFactory::getConexao();
	    	$comando = $pdo->prepare($query);
    		$comando->execute();
            $clients=array();	
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
			    $clients[] = new client($row->id,$row->nome,$row->preco);
            }
            return $clients;
        }

        public function buscarPorId($id)
        {
 		    $query = 'SELECT * FROM tb_client WHERE id=:id';		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam ('id', $id);
		    $comando->execute();
		    $result = $comando->fetch(PDO::FETCH_OBJ);
		    return new client($result->id,$result->nome,$result->preco);           
        }
    }
?>