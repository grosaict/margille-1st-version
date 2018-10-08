<?php
    class ProductOrder {
        public $id_order;
        public $id_product;
        public $qtd_product;
        public $product_amount;
       
        function __construct($id_order, $id_product, $qtd_product, $product_amount){
            $this->id_order         = $id_order;
            $this->id_product       = $id_product;
            $this->qtd_product      = $qtd_product;
            $this->product_amount   = $product_amount;
        }
    }
?>