<?php
    class ProductOrder {
        public $id_order;
        public $id_product;
        public $product_tag;
        public $product_description;
        public $qtd_product;
        public $product_amount;
       
        function __construct($id_order, $id_product, $product_tag, $product_description, $qtd_product, $product_amount){
            $this->id_order             = $id_order;
            $this->id_product           = $id_product;
            $this->product_tag          = $product_tag;
            $this->product_description  = $product_description;
            $this->qtd_product          = $qtd_product;
            $this->product_amount       = $product_amount;
        }
    }
?>