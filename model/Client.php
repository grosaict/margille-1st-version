<?php
    class Client {
        public $id_client;
        public $name_client;
        public $phone_nro;
        public $email;
        public $pwd;
        public $sex_client;
        public $birth_client;
        public $post_code;
        public $address_street;
        public $address_number;
        public $complement;
        public $district;
        public $city_county;
        public $state_province;

        function __construct($id_client, $name_client, $phone_nro, $email, $pwd, $sex_client, $birth_client, $post_code, $address_street, $address_number, $complement, $district, $city_county, $state_province){
            $this->id_client        = $id_client;
            $this->name_client      = $name_client;
            $this->phone_nro        = $phone_nro;
            $this->email            = $email;
            $this->pwd              = $pwd;
            $this->sex_client       = $sex_client;
            $this->birth_client     = $birth_client;
            $this->post_code        = $post_code;
            $this->address_street   = $address_street;
            $this->address_number   = $address_number;
            $this->complement       = $complement;
            $this->district         = $district;
            $this->city_county      = $city_county;
            $this->state_province   = $state_province;
        }
    }
?>