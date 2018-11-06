<?php
    class Order {
        public $id_order;
        public $client;
        public $order_status;   /* 1 - done / 2 - cancelled */
        public $order_amount;
                
        function __construct($id_order, $client, $order_status, $order_amount){
            $this->id_order     = $id_order;
            $this->client       = $client;
            $this->order_status = $order_status;
            $this->order_amount = $order_amount;
        }
    }
?>