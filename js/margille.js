var body = document.querySelector("body");
body.onload = function () {
    loadForm();
}

function loadForm (){
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
    var form = document.querySelector("#form");
    form.innerHTML = str;
    document.querySelector('#my-submit').addEventListener('click', prepareClient, false);
}



function prepareClient(event) {
    event.preventDefault();
    var client = {};
    client.name_client  = document.querySelector("#name_client").value;
    client.phone_nro    = document.querySelector("#phone_nro").value;
    client.email        = document.querySelector("#email").value;
    client.pwd          = document.querySelector("#pwd").value;
    insertClient(client);
    document.querySelector("#name_client").value    = "";
    document.querySelector("#phone_nro").value      = "";
    document.querySelector("#email").value          = "";
    document.querySelector("#pwd").value            = "";
}

function insertClient(client) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:1234/client", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(client));
}

function loadClients() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            createTableClients(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "http://localhost:1234/client", true);
    xhttp.send();
}

function loadProducts() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            createTableProducts(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "http://localhost:1234/product", true);
    xhttp.send();
}

function loadOrders() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            createTableOrders(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "http://localhost:1234/order", true);
    xhttp.send();
}

function createTableClients(jsonObject){
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

function createTableProducts(jsonObject){
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

function createTableOrders(jsonObject){
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
