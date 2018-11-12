/*var body = document.querySelector("body");
body.onload = function () {
    loadClients();
    loadProducts();
}*/

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
    var str = "<table>";
    str+= "<tr>";
    str+= "<th>Codigo</th>";
    str+= "<th>Nome</th>";
    str+= "<th>Telefone</th>";
    str+= "</tr>";

    for(var i in jsonObject){
        str+="<tr>";
        str+="<td>"+jsonObject[i].id_client+"</td>";
        str+="<td>"+jsonObject[i].name_client+"</td>";
        str+="<td>"+jsonObject[i].phone_nro+"</td>";
        str+="</tr>";
    } 
    str+= "</table>";

    var contentbox = document.getElementById("contentbox");
    contentbox.innerHTML = str;
}

function createTableProducts(jsonObject){
    var str = "<table>";
    str+= "<tr>";
    str+= "<th>Código</th>";
    str+= "<th>Nome</th>";
    str+= "<th>Descrição</th>";
    str+= "<th>Peço Unitário</th>";
    str+= "</tr>";

    for(var i in jsonObject){
        str+="<tr>";
        str+="<td>"+jsonObject[i].id_product+"</td>";
        str+="<td>"+jsonObject[i].product_tag+"</td>";
        str+="<td>"+jsonObject[i].product_description+"</td>";
        str+="<td>"+jsonObject[i].product_price+"</td>";
        str+="</tr>";
    } 
    str+= "</table>";

    var contentbox = document.getElementById("contentbox");
    contentbox.innerHTML = str;
}

function createTableOrders(jsonObject){
    var str = "<table>";
    str+= "<tr>";
    str+= "<th>Código</th>";
    str+= "<th>Status</th>";
    str+= "<th>Cliente</th>";
    str+= "<th>Total Pedido</th>";
    str+= "</tr>";

    for(var i in jsonObject){
        str+="<tr>";
        str+="<td>"+jsonObject[i].id_order+"</td>";
        str+="<td>"+jsonObject[i].order_status+"</td>";
        str+="<td>"+jsonObject[i].client.name_client+"</td>";
        str+="<td>"+jsonObject[i].order_amount+"</td>";
        str+="</tr>";
    } 
    str+= "</table>";

    var contentbox = document.getElementById("contentbox");
    contentbox.innerHTML = str;
}
