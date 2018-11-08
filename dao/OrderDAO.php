<?php
    include_once 'model/Order.php';
    include_once 'PDOFactory.php';
    include_once 'DAO/ClientDAO.php';
    include_once 'DAO/ProductOrderDAO.php';

    class OrderDAO
    {
        public function list()
        {
		    $query =   'SELECT  id_order, id_client, order_status, order_amount
                        FROM    tb_order';
    		$pdo = PDOFactory::getConexao();
	    	$comando = $pdo->prepare($query);
    		$comando->execute();
            $orders = [];
            // creating Client and ProductOrder objects
            $dao_client         = new ClientDAO;
            $dao_product_order  = new ProductOrderDAO;
            
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
                $client         = $dao_client->read($row->id_client);
                $product_order  = $dao_product_order->readByOrder($row->id_order);
			    $orders []      = new Order($row->id_order, $row->order_status, $row->order_amount, $client, $product_order);
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
 		    $query =   "SELECT  id_order, id_client, order_status, order_amount
                        FROM    tb_order
                        WHERE   id_order=:id_order";		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam (":id_order", $id_order);
		    $comando->execute();
            $result = $comando->fetch(PDO::FETCH_OBJ);

            // creating Client and ProductOrder objects
            $dao_client         = new ClientDAO;
            $client             = $dao_client->read($result->id_client);
            $dao_product_order  = new ProductOrderDAO;
            $product_order      = $dao_product_order->readByOrder($result->id_order);

            // creating and returning an Order object
		    return new Order($result->id_order, $result->order_status, $result->order_amount, $client, $product_order);
        }
        public function readByClient($id_client)
        {
 		    $query =   'SELECT  id_order, id_client, order_status, order_amount
                        FROM    tb_order
                        WHERE   id_client = :id_client';		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam (":id_client", $id_client);
		    $comando->execute();

            // creating Client and ProductOrder objects
            $dao_client         = new ClientDAO;
            $client             = $dao_client->read($id_client);
            $dao_product_order  = new ProductOrderDAO;

            $orders = [];
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
                $product_order  = $dao_product_order->readByOrder($row->id_order);
			    $orders []      = new Order($row->id_order, $row->order_status, $row->order_amount, $client, $product_order);
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