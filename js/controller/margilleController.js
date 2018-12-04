class MargilleController {
    constructor(){
        this.service        = new MargilleHttpService();
        this.clientView     = new ClientView('#contentbox');
        this.productView    = new ProductView('#contentbox');
        this.orderView      = new OrderView('#contentbox');
    }

    cleanContentbox () {
        document.querySelector("#contentbox").innerHTML = "";
    }

    loadClients() {
        const self  = this;
        const ok    = clients   =>  self.clientView.createClientsArea(clients, this.clientForm);
        const erro  = status    =>  console.log("Error: " + status);
        this.service.loadClients(ok, erro);
        /* essa arrow function à esquerda é o mesmo que:
        const ok = function (clients) {
                self.clientView.createClientsArea(clients)
        }    */
    }

    loadProducts() {
        const self  = this;
        const ok    = products   =>  self.productView.createProductsArea(products, this.cleanContentbox);
        const erro  = status    =>  console.log("Error: " + status);
        this.service.loadProducts(ok, erro);
    }

    loadOrders() {
        const self  = this;
        const ok    = orders   =>  self.orderView.createOrdersArea(orders, this.cleanContentbox);
        const erro  = status    =>  console.log("Error: " + status);
        this.service.loadOrders(ok, erro);
    }

    clientForm (){
        document.querySelector("#contentbox").innerHTML =
            `<form class="form">
                <legend>Cadastrar Cliente</legend>
                <label for="name_client">Nome</label>
                <input type="text" name="name_client" id="name_client" class="data_form">
                <label for="phone_nro">Mobile</label>
                <input type="number" name="phone_nro" id="phone_nro" class="data_form">
                <br/>
                <label for="email">e-mail</label>
                <input type="email" name="email" id="email" class="data_form">
                <label for="pwd">Senha</label>
                <input type="password" name="pwd" id="pwd" class="data_form">
                <br/>
                <input type="submit" name="cadastrar" value="Cadastrar">
                <input type="reset" name="limpar" value="Limpar">
            </form>`;
        console.log("AAAAAAAAA");
        document.querySelector(".form").addEventListener("submit", this.prepareClient, false);
        console.log("BBBBBBBBB");
    }

    prepareClient(event) {
        event.preventDefault();
        var client          = new Client(document.querySelector("#name_client").value, document.querySelector("#phone_nro").value, document.querySelector("#email").value, document.querySelector("#pwd").value);
        /*client.name_client  = document.querySelector("#name_client").value;
        client.phone_nro    = document.querySelector("#phone_nro").value;
        client.email        = document.querySelector("#email").value;
        client.pwd          = document.querySelector("#pwd").value;*/
        console.log(client);
        console.log("SSSSSSSSSSSS");
        const ok = function(){
            console.log("OK: testando");
        }
        const erro = function(status){
            console.log("Error: "+status);
        }
        this.service.insertClient(client, ok, erro);
    }
}