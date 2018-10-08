<?php
    class Pedidos {
        public $id_order;
        public $id_client;
        public $order_status;   /* 0 - in process / 1 - done / 2 - canceled */
                
        function __construct($id_order, $cliente){
            $this->id_order     = $id_order;
            $this->id_client    = $id_client;
            $this->order_status = $order_status;
        }
    }
?>