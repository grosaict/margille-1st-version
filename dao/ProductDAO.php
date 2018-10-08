<?php
    include_once 'model/Product.php';
	include_once 'PDOFactory.php';

    class ProductDAO
    {
        public function list()
        {
		    $query = 'SELECT * FROM tb_product';
    		$pdo = PDOFactory::getConexao();
	    	$comando = $pdo->prepare($query);
    		$comando->execute();
            $products = [];
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
			    $products[] = new product($row->id_product, $row->product_tag, $row->product_description, $row->product_price);
            }
            return $products;
        }
        public function create(Product $product)
        {
            $qInsert = "INSERT INTO tb_product(product_tag, product_description, product_price) VALUES (:product_tag, :product_description, :product_price)";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qInsert);
            $comando->bindParam(":product_tag",           $product->product_tag);
            $comando->bindParam(":product_description",   $product->product_description);
            $comando->bindParam(":product_price",         $product->product_price);
            $comando->execute();
            $client->id = $pdo->lastInsertId();
            return $product;
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
