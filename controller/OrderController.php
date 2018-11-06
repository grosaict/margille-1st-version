<?php
    include_once 'model/Order.php';
    include_once 'model/OrderView.php';
    include_once 'model/ProductOrder.php';
    include_once 'DAO/ClientDAO.php';
    include_once 'DAO/OrderDAO.php';
    include_once 'DAO/ProductDAO.php';
    include_once 'DAO/ProductOrderDAO.php';

    class OrderController{
        public function list($request, $response, $args)
        {
            $dao = new OrderDAO;
            $array_orders = $dao->list();

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
        public function create($request, $response)
        {
            $var = $request->getParsedBody();
            $id_client = (int) $var['id_client'];
            $array_productOrder = (object) $var['productOrder'];
        
            // Verify and return a exiting client
            $daoC = new ClientDAO;
            $client = $daoC->read($id_client);

            // Creat an order using a object Client
            $daoO = new OrderDAO;
            $order = $daoO->create($client);

            $daoPO = new ProductOrderDAO;
            $daoP  = new ProductDAO;
            $updated_array_productOrder = [];
            foreach ($array_productOrder as $productOrder) {

                // you must convert $productOrder in object to access the parameters
                $productOrder                   = (object) $productOrder;
                $productOrder->id_order         = $order->id_order;
                $productOrder->product_amount   = round(($productOrder->qtd_product * $daoP->readPrice($productOrder->id_product)),2);

                // you must update $order->order_amount to update Order on DB
                $order->order_amount += $productOrder->product_amount;

                // you must convert $productOrder in ProductOrder obj to use ProductOrderDAO->create
                $productOrder = new ProductOrder($productOrder->id_order, $productOrder->id_product, "", "", $productOrder->qtd_product, $productOrder->product_amount);
                $daoPO->create($productOrder);

                // you must update array_productOrder to use in OrderView in the future
                $updated_array_productOrder []  = $productOrder;
            }

            // updating $order->order_amount on DB
            $order = $daoO->updateAmount($order->id_order, $order->order_amount);

            // creating $orderView for $response
            $orderView = new OrderView($order, $updated_array_productOrder);

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
            /*  DON'T USE THIS SINTAX
                $orderView = array_merge((array) $array_products_order, (array) $order); */

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
