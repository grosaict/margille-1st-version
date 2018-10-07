<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

include_once 'controller/ClientController.php';
require 'vendor/autoload.php';

$app = new \Slim\App;

$app->group('/client', function(){
    $this->get('','ClientController:list');
    $this->post('','ClientController:create');
    $this->get('/{id:[0-9]+}','ClientController:read');
    $this->put('/{id:[0-9]+}','ClientController:update');
    $this->delete('/{id:[0-9]+}','ClientController:delete');
});

$app->run();
?>