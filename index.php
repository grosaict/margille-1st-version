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
    $this->get('/{id:[0-9]+}','ClientController:read');
    $this->put('/{id:[0-9]+}','ClientController:update');
    $this->delete('/{id:[0-9]+}','ClientController:delete');
});

$app->group('/product', function(){
    $this->get('','ProductController:list');
    $this->post('','ProductController:create');
    $this->get('/{id:[0-9]+}','ProductController:read');
    $this->put('/{id:[0-9]+}','ProductController:update');
    $this->delete('/{id:[0-9]+}','ProductController:delete');
});

$app->group('/order', function(){
    $this->get('/all','OrderController:listAll');
    $this->post('','OrderController:create');
    $this->get('/{id:[0-9]+}','OrderController:read');
    $this->put('/{id:[0-9]+}','OrderController:update');
    $this->delete('/{id:[0-9]+}','OrderController:delete');
});

$app->run();
?>
