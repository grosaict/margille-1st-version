<?php
    include_once 'model/Client.php';
	include_once 'PDOFactory.php';

    class ClientDAO
    {
        public function list()
        {
		    $query = 'SELECT * FROM tb_client';
    		$pdo = PDOFactory::getConexao();
	    	$comando = $pdo->prepare($query);
    		$comando->execute();
            $clients = [];
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
			    $clients[] = new Client($row->id_client, $row->name_client, $row->phone_nro, $row->email, $row->pwd);
            }
            return $clients;
        }
        public function create(Client $client)
        {
            $qInsert = "INSERT  INTO tb_client  (name_client, phone_nro, email, pwd)
                        VALUES                  (:name_client, :phone_nro, :email, :pwd)";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qInsert);
            $comando->bindParam(":name_client", $client->name_client);
            $comando->bindParam(":phone_nro",   $client->phone_nro);
            $comando->bindParam(":email",       $client->email);
            $comando->bindParam(":pwd",         $client->pwd);
            $comando->execute();
            $client->id = $pdo->lastInsertId();
            return $client;
        }
        public function read($id_client)
        {
 		    $query =   'SELECT * FROM tb_client
                        WHERE id_client=:id_client';		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam (":id_client", $id_client);
		    $comando->execute();
		    $result = $comando->fetch(PDO::FETCH_OBJ);
		    return new client($result->id_client, $result->name_client, $result->phone_nro, $result->email, $result->pwd);           
        }
        public function delete($id_client)
        {
            $qDelete = "DELETE FROM tb_client
                        WHERE id_client=:id_client";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qDelete);
            $comando->bindParam(":id_client", $id_client);
            $comando->execute();
        }
        public function update(Client $client)
        {
            $qUpdate = "UPDATE tb_client
                        SET name_client=:name_client, phone_nro=:phone_nro, email=:email, pwd=:pwd
                        WHERE id_client=:id_client";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qUpdate);
            $comando->bindParam(":id_client",   $client->id_client);
            $comando->bindParam(":name_client", $client->name_client);
            $comando->bindParam(":phone_nro",   $client->phone_nro);
            $comando->bindParam(":email",       $client->email);
            $comando->bindParam(":pwd",         $client->pwd);
            $comando->execute();
            return $client;
        }
    }
?>
