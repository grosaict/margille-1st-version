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
    $this->get('/{id_client:[0-99]+}','ClientController:read');
    $this->get('/order/{id_client:[0-99]+}','OrderController:readByClient');
    $this->put('/{id_client:[0-99]+}','ClientController:update');
    $this->delete('/{id_client:[0-99]+}','ClientController:delete');
});

$app->group('/product', function(){
    $this->get('','ProductController:list');
    $this->post('','ProductController:create');
    $this->get('/{id_product:[0-99]+}','ProductController:read');
    $this->put('/{id_product:[0-99]+}','ProductController:update');
    $this->delete('/{id_product:[0-99]+}','ProductController:delete');
});

$app->group('/order', function(){
    $this->get('','OrderController:list');
    $this->post('','OrderController:create');
    $this->get('/{id_order:[0-99]+}','OrderController:readByOrder');
    $this->put('/{id_order:[0-99]+}','OrderController:editOrder');
    $this->put('/{id_order:[0-99]+}/{order_status:[1-2]+}','OrderController:updateStatus');
});

try
{
    $app->run();
}
catch (Exception $e)
{
    echo ("\o/ ".$e);
}
?>
