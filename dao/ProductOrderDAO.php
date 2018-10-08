<?php
    include_once 'model/ProductOrder.php';
	include_once 'PDOFactory.php';

    class ClientDAO
    {
        public function list()
        {
		    $query = 'SELECT * FROM tb_product_order';
    		$pdo = PDOFactory::getConexao();
	    	$comando = $pdo->prepare($query);
    		$comando->execute();
            $products_orders = [];
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
			    $products_orders[] = new productorder($row->id_order, $row->id_product, $row->qtd_product);
            }
            return $products_orders;
        }
        public function create(ProductOrder $products_order)
        {
            $qInsert = "INSERT INTO tb_product_order(id_order, id_product, qtd_product) VALUES (:id_order, :id_product, :qtd_product)";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qInsert);
            $comando->bindParam(":id_order",            $products_order->id_order);
            $comando->bindParam(":id_product",          $products_order->id_product);
            $comando->bindParam(":qtd_product",         $products_order->qtd_product);
            $comando->execute();
            $client->id = $pdo->lastInsertId();
            return $products_order ;
        }
        public function read($id_product)
        {
 		    $query = 'SELECT * FROM tb_product WHERE id_product=:id_product';		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam (":id_product", $id_product);
		    $comando->execute();
		    $result = $comando->fetch(PDO::FETCH_OBJ);
		    return new product($result->id_product, $result->product_tag, $result->product_description, $result->product_price);           
        }
        public function delete($id_product)
        {
            $qDelete = "DELETE FROM tb_product WHERE id_product=:id_product";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qDelete);
            $comando->bindParam(":id_product", $id_product);
            $comando->execute();
        }
        public function update(Product $product)
        {
            $qUpdate = "UPDATE tb_product SET product_tag=:product_tag, product_description=:product_description, product_price=:product_price WHERE id_product=:id_product";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qUpdate);
            $comando->bindParam(":id_product",          $product->id_product);
            $comando->bindParam(":product_tag",         $product->product_tag);
            $comando->bindParam(":product_description", $product->product_description);
            $comando->bindParam(":product_price",       $product->product_price);
            $comando->execute();
        }
    }
?>
