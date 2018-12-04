class MargilleController {
    constructor(){
        this.service = new MargilleHttpService();
    }

    loadClients() {
        const self  = this;
        const ok    = clients   =>  self.createTableClients(clients);   /* essa arrow function à esquerda é o mesmo que:*/
        const erro  = status    =>  console.log("Error: " + status);    /* const ok = function (clients){               */
        this.service.loadClients(ok, erro);                             /*            self.createTableClients(clients)  */
    }                                                                   /* };                                           */

    loadProducts() {
        const self  = this;
        const ok    = products   =>  self.createTableProducts(products);
        const erro  = status    =>  console.log("Error: " + status);
        this.service.loadProducts(ok, erro);
    }

    loadOrders() {
        const self  = this;
        const ok    = orders   =>  self.createTableOrders(orders);
        const erro  = status    =>  console.log("Error: " + status);
        this.service.loadOrders(ok, erro);
    }

    createTableClients(jsonObject){
        var str = "<h2>Lista de Clientes</h2>";
        str += "<table>";
        str += "<tr>";
        str += "<th>Codigo</th>";
        str += "<th>Nome</th>";
        str += "<th>Telefone</th>";
        str += "<th>e-mail</th>";
        str += "</tr>";

        for(var i in jsonObject){
            str +="<tr>";
            str +="<td>"+jsonObject[i].id_client+"</td>";
            str +="<td>"+jsonObject[i].name_client+"</td>";
            str +="<td>"+jsonObject[i].phone_nro+"</td>";
            str +="<td>"+jsonObject[i].email+"</td>";
            str +="</tr>";
        } 
        str += "</table>";

        var contentbox = document.querySelector("#contentbox");
        contentbox.innerHTML = str;
    }

    createTableProducts(jsonObject){
        var str = "<h2>Lista de Produtos</h2>";
        str += "<table>";
        str += "<tr>";
        str += "<th>Código</th>";
        str += "<th>Nome</th>";
        str += "<th>Descrição</th>";
        str += "<th>Peço Unitário</th>";
        str += "</tr>";

        for(var i in jsonObject){
            str +="<tr>";
            str +="<td>"+jsonObject[i].id_product+"</td>";
            str +="<td>"+jsonObject[i].product_tag+"</td>";
            str +="<td>"+jsonObject[i].product_description+"</td>";
            str +="<td>"+jsonObject[i].product_price+"</td>";
            str +="</tr>";
        } 
        str += "</table>";

        var contentbox = document.querySelector("#contentbox");
        contentbox.innerHTML = str;
    }

    createTableOrders(jsonObject){
        var str = "<h2>Lista de Pedidos</h2>";
        str += "<table>";
        str += "<tr>";
        str += "<th>Código</th>";
        str += "<th>Status</th>";
        str += "<th>Cliente</th>";
        str += "<th>Total Pedido</th>";
        str += "</tr>";

        for(var i in jsonObject){
            str +="<tr>";
            str +="<td>"+jsonObject[i].id_order+"</td>";
            str +="<td>"+jsonObject[i].order_status+"</td>";
            str +="<td>"+jsonObject[i].client.name_client+"</td>";
            str +="<td>"+jsonObject[i].order_amount+"</td>";
            str +="</tr>";
        } 
        str += "</table>";

        var contentbox = document.querySelector("#contentbox");
        contentbox.innerHTML = str;
    }
    
    insertClient(client) {
        const self = this;
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:1234/client", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(client));
    }

    loadForm (){
        const self = this;
        var str = "<form>";
        str += "<legend>Cadastrar Cliente</legend>";
        str += "<label for=\"name_client\">Nome</label>";
        str += "<input type=\"text\" name=\"name_client\" id=\"name_client\">";
        str += "<label for=\"phone_nro\">Mobile</label>";
        str += "<input type=\"number\" name=\"phone_nro\" id=\"phone_nro\">";
        str += "<br/>";
        str += "<label for=\"email\">e-mail</label>";
        str += "<input type=\"email\" name=\"email\" id=\"email\">";
        str += "<label for=\"pwd\">Senha</label>";
        str += "<input type=\"password\" name=\"pwd\" id=\"pwd\">";
        str += "<br/>";
        str += "<input type=\"submit\" name=\"cadastrar\" id=\"my-submit\" value=\"Cadastrar\">";
        str += "<input type=\"reset\" name=\"limpar\" id=\"my-reset\" value=\"Limpar\">";
        str += "</form>";
        document.querySelector("#form").innerHTML = str;
        document.querySelector('#my-submit').addEventListener('click', self.prepareClient, false);
    }

    prepareClient(event) {
        const self = this;
        event.preventDefault();
        var client = {};
        client.name_client  = document.querySelector("#name_client").value;
        client.phone_nro    = document.querySelector("#phone_nro").value;
        client.email        = document.querySelector("#email").value;
        client.pwd          = document.querySelector("#pwd").value;
        self.insertClient(client);
        document.querySelector("#name_client").value    = "";
        document.querySelector("#phone_nro").value      = "";
        document.querySelector("#email").value          = "";
        document.querySelector("#pwd").value            = "";
    }
}