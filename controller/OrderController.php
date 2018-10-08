<?php

    include_once 'model/Order.php';
    include_once 'DAO/OrderDAO.php';
    include_once 'DAO/ProductOrderDAO.php';

    class OrderController{
        public function listAll($request, $response, $args)
        {
            $dao = new OrderDAO;    
            $array_orders = $dao->listAll();

            $response = $response->withJson($array_orders);
            $response = $response->withHeader('Content-type', 'application/json');
            $response = $response->withStatus(200);
            return $response;
        }
        public function create($request, $response, $args)
        {
            $var = $request->getParsedBody();
            $order = new Order($var['id_order'], $var['id_client'], $var['order_status'], $var['order_amount']);
        
            $dao = new OrderDAO;
            $order = $dao->create($order);

            $response = $response->withJson($order);
            $response = $response->withHeader('Content-type', 'application/json');    
            $response = $response->withStatus(201);
            return $response;
        }
        public function readByOrder($request, $response, $args)
        {
            $id_order = (int) $args['id_order'];
            
            $dao = new OrderDAO;    
            $order = $dao->readByOrder($id_order);
            
            $dao = new ProductOrderDAO;
            $array_products_order = $dao->readByOrder($id_order);

            $response = $response->withJson($order);
            $response = $response->withHeader('Content-type', 'application/json');    
            $response = $response->withStatus(200);
            return $response;
        }
        public function readByClient($request, $response, $args)
        {
            $id_client = (int) $args['id_client'];
            
            $dao = new OrderDAO;    
            $orders [] = $dao->readByClient($id_client);
                
            $response = $response->withJson($orders);
            $response = $response->withHeader('Content-type', 'application/json');    
            $response = $response->withStatus(200);
            return $response;
        }
        public function updateStatus($request, $response, $args)
        {
            $id_order = (int) $args['id_order'];
            $order_status = (int) $args['order_status'];

            $dao = new OrderDAO;    
            $order = $dao->updateStatus($id_order, $order_status);
        
            $response = $response->withJson($order);
            $response = $response->withHeader('Content-type', 'application/json');    
            $response = $response->withStatus(202);
            return $response;        
        }
    }
?>
