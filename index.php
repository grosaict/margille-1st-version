<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

include_once 'controller/ClientController.php';
include_once 'controller/ProductController.php';
include_once 'controller/OrderController.php';
require 'vendor/autoload.php';

$app = new \Slim\App;

$app->group('/client', function(){
    $this->get('','ClientController:list');
    $this->post('','ClientController:create');
    $this->get('/{id_client:[0-9]+}','ClientController:read');
    $this->put('/{id_client:[0-9]+}','ClientController:update');
    $this->delete('/{id_client:[0-9]+}','ClientController:delete');
});

$app->group('/product', function(){
    $this->get('','ProductController:list');
    $this->post('','ProductController:create');
    $this->get('/{id_product:[0-9]+}','ProductController:read');
    $this->put('/{id_product:[0-9]+}','ProductController:update');
    $this->delete('/{id_product:[0-9]+}','ProductController:delete');
});

$app->group('/order', function(){
    $this->get('','OrderController:listAll');
    $this->post('','OrderController:create');
    $this->get('/{id_order:[0-9]+}','OrderController:readByOrder');
    $this->get('/client/{id_client:[0-9]+}','OrderController:readByClient');
    $this->put('/{id_order:[0-9]+}/{order_status:[1-2]+}','OrderController:updateStatus');
});

$app->run();
?>
