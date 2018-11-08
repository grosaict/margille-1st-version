<?php
    class ProductOrder {
        public $product;
        public $qtd_product;
        public $product_amount;
       
        function __construct($product, $qtd_product, $product_amount){
            $this->product          = $product;
            $this->qtd_product      = $qtd_product;
            $this->product_amount   = $product_amount;
        }
    }
?>