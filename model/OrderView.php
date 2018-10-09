<?php
    /* Model para concatenar todas as informações de um pedido e seus produtos associados */

    class OrderView {
        public $order;
        public $productOrder;
                
        function __construct($order, $productOrder){
            $this->order        = $order;
            $this->productOrder = $productOrder;
         }
    }
?>