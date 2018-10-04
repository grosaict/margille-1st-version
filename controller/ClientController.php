<?php

    include_once 'Client.php';
    include_once 'ClientDAO.php';

    class ClientController{
        public function listar($request, $response, $args)
        {
            $dao = new ClientDAO;    
            $array_clients = $dao->listar();

            $response = $response->withJson($array_clients);
            $response = $response->withHeader('Content-type', 'application/json');    
            return $response;
        }
        public function buscarPorId($request, $response, $args)
        {
            $id = (int) $args['id'];
            
            $dao = new ClientDAO;    
            $client = $dao->buscarPorId($id);  
                
            $response = $response->withJson($client);
            $response = $response->withHeader('Content-type', 'application/json');    
            return $response;
        }
        public function inserir($request, $response, $args)
        {
            $var = $request->getParsedBody();
            $client = new Client(0, $var['nome'], $var['preco']);               /* AJUSTAR A ASSINATURA DO METODO */
        
            $dao = new ClientDAO;    
            $client = $dao->inserir($client);
        
            $response = $response->withJson($client);
            $response = $response->withHeader('Content-type', 'application/json');    
            $response = $response->withStatus(201);
            return $response;
        }
        public function atualizar($request, $response, $args)
        {
            $id = (int) $args['id'];
            $var = $request->getParsedBody();
            $client = new Client($id, $var['nome'], $var['preco']);               /* AJUSTAR A ASSINATURA DO METODO */
        
            $dao = new ClientDAO;    
            $dao->atualizar($client);
        
            $response = $response->withJson($client);
            $response = $response->withHeader('Content-type', 'application/json');    
            return $response;        
        }
        public function deletar($request, $response, $args)
        {
            $id = (int) $args['id'];
            
            $dao = new ClientDAO; 
            $client = $dao->buscarPorId($id);   
            $dao->deletar($id);
            
            $response = $response->withJson($client);
            $response = $response->withHeader('Content-type', 'application/json');    
            return $response;
        }
    }

?>