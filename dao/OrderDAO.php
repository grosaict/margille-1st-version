<?php
    include_once 'model/Order.php';
	include_once 'PDOFactory.php';

    class ClientDAO
    {
        public function list()
        {
		    $query = 'SELECT * FROM tb_order';
    		$pdo = PDOFactory::getConexao();
	    	$comando = $pdo->prepare($query);
    		$comando->execute();
            $clients = [];
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
			    $orders[] = new pedidos($row->id_order, $row->id_cliente);
            }
            return $orders;
        }
        public function create(Order $order)
        {
            $qInsert = "INSERT INTO tb_order(id_order, id_cliente) VALUES (:id_order, :id_cliente)";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qInsert);
            $comando->bindParam(":id_order",    $order->id_order);
            $comando->bindParam(":id_cliente",  $order->id_cliente);
            $comando->execute();
            $client->id = $pdo->lastInsertId();
            return $order;
        }
        public function read($id_order)
        {
 		    $query = 'SELECT * FROM tb_order WHERE id_order=:id_order';		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam (":id_order", $id_order);
		    $comando->execute();
		    $result = $comando->fetch(PDO::FETCH_OBJ);
		    return new order($result->id_order, $result->id_cliente);           
        }
        public function delete($id_order)
        {
            $qDelete = "DELETE FROM tb_order WHERE id_order=:id_order";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qDelete);
            $comando->bindParam(":id_order", $id_order);
            $comando->execute();
        }
        public function update(Order $order)
        {
            //estou com duvida na linha 51 nos campos inseridos
            $qUpdate = "UPDATE tb_order SET id_order=:id_order, id_cliente=id_cliente WHERE id_order=:id_order";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qUpdate);
            $comando->bindParam(":id_order",  $order->id_order);
            $comando->bindParam(":id_client", $order->id_client);
            $comando->execute();
        }
    }
?>
