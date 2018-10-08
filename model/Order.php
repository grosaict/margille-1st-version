<?php
    class Pedidos {
        public $id_order;
        public $id_client;
                
        function __construct($id_order, $cliente){
            $this->id_order          = $id_order;
            $this->id_client         = $id_client;
        }
    }
?>