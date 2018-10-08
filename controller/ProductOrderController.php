<?php

    include_once 'model/ProductOrder.php';
    include_once 'DAO/ProductOrderDAO.php';

    class ProductOrderController{
        public function create(ProductOrder $productOrder)
        {
            $dao = new ProductOrderDAO;
            $productOrder = $dao->create($productOrder);

            $response = $response->withJson($productOrder);
            $response = $response->withHeader('Content-type', 'application/json');    
            $response = $response->withStatus(201);
            return $response;
        }
        public function readByOrder($id_order)
        {
            $dao = new ProductOrderDAO;    
            $array_products_order = $dao->readByOrder($id_order);
                
            $response = $response->withJson($array_products_order);
            $response = $response->withHeader('Content-type', 'application/json');    
            $response = $response->withStatus(200);
            return $response;
        }
    }
?>
