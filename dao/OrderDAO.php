<?php
    include_once 'model/Order.php';
	include_once 'PDOFactory.php';

    class OrderDAO
    {
        public function list()
        {
		    $query =   'SELECT  id_order, tb_order.id_client, name_client, order_status, order_amount
                        FROM    tb_order, tb_client
                        WHERE   tb_order.id_client = tb_client.id_client';
    		$pdo = PDOFactory::getConexao();
	    	$comando = $pdo->prepare($query);
    		$comando->execute();
            $orders = [];
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
			    $orders [] = new Order($row->id_order, $row->id_client, $row->name_client, $row->order_status, $row->order_amount);
            }
            return $orders;
        }
        public function create($id_client)
        {
            $qInsert = "INSERT INTO tb_order(id_client, order_status, order_amount)
                        VALUES              (:id_client, 1, 0)";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qInsert);
            $comando->bindParam(":id_client", $id_client);
            $comando->execute();
            $id_order = $pdo->lastInsertId();
            return OrderDAO::readByOrder($id_order);
        }
        public function readByOrder($id_order)
        {
 		    $query =   "SELECT  id_order, tb_order.id_client, name_client, order_status, order_amount
                        FROM    tb_order, tb_client
                        WHERE   id_order=:id_order AND tb_order.id_client = tb_client.id_client";		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam (":id_order", $id_order);
		    $comando->execute();
		    $result = $comando->fetch(PDO::FETCH_OBJ);
		    return new Order($result->id_order, $result->id_client, $result->name_client, $result->order_status, $result->order_amount);           
        }
        public function readByClient($id_client)
        {
 		    $query =   'SELECT  id_order, tb_order.id_client, name_client, order_status, order_amount
                        FROM    tb_order, tb_client
                        WHERE   tb_order.id_client = tb_client.id_client';		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam (":id_client", $id_client);
		    $comando->execute();
            $orders = [];
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
			    $orders [] = new Order($row->id_order, $row->id_client, $row->name_client, $row->order_status, $row->order_amount);
            }
		    return $orders;
        }
        public function updateStatus($id_order, $order_status)
        {
            $qUpdate = "UPDATE  tb_order
                        SET     order_status=:order_status
                        WHERE   id_order=:id_order";          
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qUpdate);
            $comando->bindParam(":id_order",        $id_order);
            $comando->bindParam(":order_status",    $order_status);
            $comando->execute();
            return OrderDAO::readByOrder($id_order);
        }
        public function updateAmount($id_order, $order_amount)
        {
            $qUpdate = "UPDATE  tb_order
                        SET     order_amount=:order_amount
                        WHERE   id_order=:id_order";          
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qUpdate);
            $comando->bindParam(":id_order",        $id_order);
            $comando->bindParam(":order_amount",    $order_amount);
            $comando->execute();
            return OrderDAO::readByOrder($id_order);
        }
    }
?>