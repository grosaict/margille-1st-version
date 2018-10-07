<?php
    class Client {
        public $id_client;
        public $name_client;
        public $phone_nro;
        public $email;
        public $pwd;

        function __construct($id_client, $name_client, $phone_nro, $email, $pwd){
            $this->id_client        = $id_client;
            $this->name_client      = $name_client;
            $this->phone_nro        = $phone_nro;
            $this->email            = $email;
            $this->pwd              = $pwd;
        }
    }
?>