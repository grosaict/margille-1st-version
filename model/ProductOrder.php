<?php
    class ProductOrder {
        public $id_order;
        public $id_product;
        public $qtd_product;
       
        function __construct($id_order, $id_product, $qtd_product){
            $this->id_order     = $id_order;
            $this->id_product   = $id_product;
            $this->qtd_product  = $qtd_product;
        }
    }
?>