<?php
    include_once 'model/Order.php';
    include_once 'model/ProductOrder.php';
    include_once 'DAO/ClientDAO.php';
    include_once 'DAO/OrderDAO.php';
    include_once 'DAO/ProductDAO.php';
    include_once 'DAO/ProductOrderDAO.php';

    class OrderController{
        public function list($request, $response)
        {
            $dao = new OrderDAO;
            $array_orders = $dao->list();

            $response = $response->withJson($array_orders);
            $response = $response->withHeader('Content-type', 'application/json');
            $response = $response->withStatus(200);
            return $response;
        }
        public function create($request, $response)
        {
            $var = $request->getParsedBody();
            $id_client = (int) $var['id_client'];
            $array_productOrder = (object) $var['productOrder'];

            // Creating the order
            $dao_order  = new OrderDAO;
            $order      = $dao_order->create($id_client);

            $dao_product        = new ProductDAO;
            $dao_product_order  = new ProductOrderDAO;

            foreach ($array_productOrder as $productOrder) {
                // you must convert $productOrder in object to access its parameters
                $productOrder                   = (object) $productOrder;
                $product                        = $dao_product->read($productOrder->id_product);
                $productOrder->id_order         = $order->id_order;
                $productOrder->product_amount   = round(($productOrder->qtd_product * $product->product_price), 2);

                // you must update $order->order_amount to update Order on DB
                $order->order_amount += $productOrder->product_amount;

                // here you really create the productOrder
                $dao_product_order->create($productOrder);
             }

            // updating $order->order_amount on DB
            $order = $dao_order->updateAmount($order->id_order, $order->order_amount);

            $response = $response->withJson($order);
            $response = $response->withHeader('Content-type', 'application/json');    
            $response = $response->withStatus(201);
            return $response;
        }
        public function readByOrder($request, $response, $args)
        {
            $id_order   = (int) $args['id_order'];
            $dao        = new OrderDAO;    
            $order      = $dao->readByOrder($id_order);

            $response = $response->withJson($order);
            $response = $response->withHeader('Content-type', 'application/json');    
            $response = $response->withStatus(200);
            return $response;
        }
        public function readByClient($request, $response, $args)
        {
            $id_client      = (int) $args['id_client'];
            $dao            = new OrderDAO;    
            $array_orders   = $dao->readByClient($id_client);

            $response = $response->withJson($array_orders);
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
