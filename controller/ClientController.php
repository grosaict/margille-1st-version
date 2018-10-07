<?php

    include_once 'model/Client.php';
    include_once 'DAO/ClientDAO.php';

    class ClientController{
        public function list($request, $response, $args)
        {
            $dao = new ClientDAO;    
            $array_clients = $dao->list();

            $response = $response->withJson($array_clients);
            $response = $response->withHeader('Content-type', 'application/json');
            $response = $response->withStatus(200);
            return $response;
        }
        public function create($request, $response, $args)
        {
            $var = $request->getParsedBody();
            $client = new Client(0, $var['name_client'], $var['phone_nro'], $var['email'], $var['pwd']);
        
            $dao = new ClientDAO;
            $client = $dao->create($client);

            $response = $response->withJson($client);
            $response = $response->withHeader('Content-type', 'application/json');    
            $response = $response->withStatus(201);
            return $response;
        }
        public function read($request, $response, $args)
        {
            $id_client = (int) $args['id'];
            
            $dao = new ClientDAO;    
            $client = $dao->read($id_client);
                
            $response = $response->withJson($client);
            $response = $response->withHeader('Content-type', 'application/json');    
            $response = $response->withStatus(200);
            return $response;
        }
        public function update($request, $response, $args)
        {
            $id_client = (int) $args['id'];
            $var = $request->getParsedBody();
            $client = new Client($id_client, $var['name_client'], $var['phone_nro'], $var['email'], $var['pwd']);
        
            $dao = new ClientDAO;    
            $dao->update($client);
        
            $response = $response->withJson($client);
            $response = $response->withHeader('Content-type', 'application/json');    
            $response = $response->withStatus(202);
            return $response;        
        }
        public function delete($request, $response, $args)
        {
            $id_client = (int) $args['id'];
            
            $dao = new ClientDAO; 
            $client = $dao->read($id_client);   
            $dao->delete($id_client);
            
            $response = $response->withJson($client);
            $response = $response->withHeader('Content-type', 'application/json');    
            $response = $response->withStatus(202);
            return $response;
        }
    }

?>
