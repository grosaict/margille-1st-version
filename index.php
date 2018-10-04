<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

include_once 'ClientController.php';
require './vendor/autoload.php';

$app = new \Slim\App;

$app->group('/client', function(){
    $this->get('','ClientController:listar');
    $this->post('','ClientController:inserir');

    $this->get('/{id:[0-9]+}','ClientController:buscar');
    $this->put('/{id:[0-9]+}','ClientController:atualizar');
    $this->delete('/{id:[0-9]+}','ClientController:deletar');
    
});
$app->run();
?>