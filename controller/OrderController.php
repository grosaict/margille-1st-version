<?php
    include_once 'model/Order.php';
    include_once 'model/OrderView.php';
    include_once 'DAO/OrderDAO.php';
    include_once 'DAO/ProductOrderDAO.php';

    class OrderController{
        public function listAll($request, $response, $args)
        {
            $dao = new OrderDAO;
            $array_orders = $dao->listAll();

            $orderView = [];
            $dao = new ProductOrderDAO;
            // go through ORDERS array to do SQL of PRODUCTS_ORDER
            foreach ($array_orders as $order) {
                // return PRODUCTS_ORDER of ORDERS
                $array_products_order = $dao->readByOrder($order->id_order);
                // make array of ORDERVIEW (ORDER + PRODUCTS_ORDER)
                $orderView [] = new OrderView($order, $array_products_order);
            }

            $response = $response->withJson($orderView);
            $response = $response->withHeader('Content-type', 'application/json');
            $response = $response->withStatus(200);
            return $response;
        }
        public function create($request, $response, $args)
        {
            $id_client = (int) $args['id_client'];
            $productOrder = 
        
            $dao = new OrderDAO;
            $orderView = $dao->create($id_client, $productOrder);

            $response = $response->withJson($orderView);
            $response = $response->withHeader('Content-type', 'application/json');    
            $response = $response->withStatus(201);
            return $response;
        }
        public function readByOrder($request, $response, $args)
        {
            $id_order = (int) $args['id_order'];
            
            // return ORDER
            $dao = new OrderDAO;    
            $order = $dao->readByOrder($id_order);

            // return PRODUCTS_ORDER of ORDER
            $dao = new ProductOrderDAO;
            $array_products_order = $dao->readByOrder($id_order);

            // make ORDERVIEW (ORDER + PRODUCTS_ORDER)
            $orderView = new OrderView($order, $array_products_order);

            $response = $response->withJson($orderView);
            $response = $response->withHeader('Content-type', 'application/json');    
            $response = $response->withStatus(200);
            return $response;
        }
        public function readByClient($request, $response, $args)
        {
            $id_client = (int) $args['id_client'];
            
            // make array of ORDERS by Client
            $dao = new OrderDAO;    
            $array_orders = $dao->readByClient($id_client);

            $orderView = [];
            $dao = new ProductOrderDAO;
            // go through ORDERS array to do SQL of PRODUCTS_ORDER
            foreach ($array_orders as $order) {
                // return PRODUCTS_ORDER of ORDERS
                $array_products_order = $dao->readByOrder($order->id_order);
                // make array of ORDERVIEW (ORDER + PRODUCTS_ORDER)
                $orderView [] = new OrderView($order, $array_products_order);
            }
            
            $response = $response->withJson($orderView);
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
