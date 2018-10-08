<?php
    include_once 'model/Order.php';
	include_once 'PDOFactory.php';

    class OrderDAO
    {
        public function listAll()
        {
		    $query = 'SELECT * FROM tb_order';
    		$pdo = PDOFactory::getConexao();
	    	$comando = $pdo->prepare($query);
    		$comando->execute();
            $orders = [];
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
			    $orders[] = new pedidos($row->id_order, $row->id_cliente, $row->order_status, $row->order_amount);
            }
            return $orders;
        }
        public function create(Order $order)
        {
            $qInsert = "INSERT INTO tb_order(id_order, id_cliente, order_status, order_amount)
                        VALUES              (:id_order, :id_cliente, :order_status, :order_amount)";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qInsert);
            $comando->bindParam(":id_order",        $order->id_order);
            $comando->bindParam(":id_cliente",      $order->id_cliente);
            $comando->bindParam(":order_status",    $order->order_status);
            $comando->bindParam(":order_amount",    $order->order_amount);
            $comando->execute();
            $order->id = $pdo->lastInsertId();
            return $order;
        }
        public function readByOrder($id_order)
        {
 		    $query =   "SELECT * FROM tb_order
                        WHERE id_order=:id_order";		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam (":id_order", $id_order);
		    $comando->execute();
		    $result = $comando->fetch(PDO::FETCH_OBJ);
		    return new Order($result->id_order, $result->id_cliente, $result->order_status, $result->order_amount);           
        }
        public function updateStatus($id_order, $order_status)
        {
            $qUpdate = "UPDATE tb_order
                        SET order_status=:order_status
                        WHERE id_order=:id_order";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qUpdate);
            $comando->bindParam(":id_order",  $order->id_order);
            $comando->bindParam(":order_status", $order->id_client);
            $comando->execute();
        }
    }
?>
