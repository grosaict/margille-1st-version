<?php
    class Order {
        public $id_order;
        public $order_status;   /* 1 - done / 2 - cancelled */
        public $order_amount;
        public $client;
        public $products_order; /* array of products */
                
        function __construct($id_order, $order_status, $order_amount, $client, $products_order){
            $this->id_order         = $id_order;
            $this->order_status     = $order_status;
            $this->order_amount     = $order_amount;
            $this->client           = $client;
            $this->products_order   = $products_order;
        }
    }
?>