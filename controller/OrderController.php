<?php

    include_once 'model/Order.php';
    include_once 'DAO/OrderDAO.php';

    class OrderController{
        public function listAll($request, $response, $args)
        {
            $dao = new ProductDAO;    
            $array_products = $dao->list();

            $response = $response->withJson($array_products);
            $response = $response->withHeader('Content-type', 'application/json');
            $response = $response->withStatus(200);
            return $response;
        }
        public function create($request, $response, $args)
        {
            $var = $request->getParsedBody();
            $product = new Product(0, $var['product_tag'], $var['product_description'], $var['product_price']);
        
            $dao = new ProductDAO;
            $product = $dao->create($product);

            $response = $response->withJson($product);
            $response = $response->withHeader('Content-type', 'application/json');    
            $response = $response->withStatus(201);
            return $response;
        }
        public function read($request, $response, $args)
        {
            $id_product = (int) $args['id'];
            
            $dao = new ProductDAO;    
            $product = $dao->read($id_product);
                
            $response = $response->withJson($product);
            $response = $response->withHeader('Content-type', 'application/json');    
            $response = $response->withStatus(200);
            return $response;
        }
        public function update($request, $response, $args)
        {
            $id_product = (int) $args['id'];
            $var = $request->getParsedBody();
            $product = new Product($id_product, $var['product_tag'], $var['product_description'], $var['product_price']);
        
            $dao = new ProductDAO;    
            $dao->update($product);
        
            $response = $response->withJson($product);
            $response = $response->withHeader('Content-type', 'application/json');    
            $response = $response->withStatus(202);
            return $response;        
        }
        public function delete($request, $response, $args)
        {
            $id_product = (int) $args['id'];
            
            $dao = new ProductDAO; 
            $product = $dao->read($id_product);   
            $dao->delete($id_product);
            
            $response = $response->withJson($product);
            $response = $response->withHeader('Content-type', 'application/json');    
            $response = $response->withStatus(202);
            return $response;
        }
    }
?>
