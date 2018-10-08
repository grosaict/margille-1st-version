<?php
    class Product {
        public $id_product;
        public $product_tag;
        public $product_description;
        public $product_price;
        
        function __construct($id_product, $product_tag, $product_description, $product_price){
            $this->id_product           = $id_product;
            $this->product_tag          = $product_tag;
            $this->product_description  = $product_description;
            $this->product_price        = $product_price;
       }
    }
?>