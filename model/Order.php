<?php
    class Pedidos {
        public $id_order;
        public $id_client;
        public $order_status;   /* 1 - done / 2 - cancelled */
        public $order_amount;
                
        function __construct($id_order, $cliente){
            $this->id_order     = $id_order;
            $this->id_client    = $id_client;
            $this->order_status = $order_status;
            $this->order_amount = $order_amount;
        }
    }
?>