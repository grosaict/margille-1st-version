<?php
    include_once 'model/ProductOrder.php';
	include_once 'PDOFactory.php';

    /* Depois de gerado um pedido o mesmo não pode ser excluído. Dessa forma, os produtos do pedido
    também não podem ser excluídos, apenas incluídos ou listados. */

    class ProductOrderDAO
    {
        public function create(ProductOrder $product_order)
        {
            $qInsert = "INSERT INTO tb_product_order(id_order, id_product, qtd_product, product_amount)
                        VALUES                      (:id_order, :id_product, :qtd_product, :product_amount)";
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qInsert);
            $comando->bindParam(":id_order",        $product_order->id_order);
            $comando->bindParam(":id_product",      $product_order->id_product);
            $comando->bindParam(":qtd_product",     $product_order->qtd_product);
            $comando->bindParam(":product_amount",  $product_order->product_amount);
            $comando->execute();
            $product_order->id = $pdo->lastInsertId();
            return $product_order;
        }
        public function readByOrder($id_order)
        {
 		    $query =   "SELECT * FROM tb_product_order
                        WHERE id_order=:id_order";
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam(":id_order", $id_order);
            $comando->execute();
            $array_products_order = [];
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
			    $array_products_order[] = new ProductOrder($row->id_order, $row->id_product, $row->qtd_product, $row->product_amount);
            }
		    return $array_products_order;           
        }
    }
?>
