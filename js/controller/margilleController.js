class MargilleController {
    constructor(){
        this.mainArea       = "#contentbox";
        this.service        = new MargilleHttpService();
        this.clientView     = new ClientView(this.mainArea, this);
        this.productView    = new ProductView(this.mainArea);
        this.orderView      = new OrderView(this.mainArea);
        this.state          = status    =>  console.log("Estado HTTP: " + status);
    }

    loadClients() {
        const self  = this;
        const ok    = clients   =>  self.clientView.createClientsArea(clients);
        this.service.loadClients(ok, this.state);
        /* essa arrow function acima é o mesmo que:
        const state  = function (status) {
            console.log("stater: " + status);
        }*/
    }

    loadClient() {
        event.preventDefault();
        const self      = this;
        const ok        = function (client) {
            if (client != null) {
                document.querySelector("#my_submit").style.display  = "block";
                document.querySelector("#name_client").value        = client.name_client;
                document.querySelector("#phone_nro").value          = client.phone_nro;
                document.querySelector("#email").value              = client.email;
                document.querySelector("#pwd").value                = client.pwd;
            } else {
                self.crudResponse("<h1>Cliente não Encontrado</h1>");
            }
        }
        var id_client   = document.querySelector("#id_client").value;
        this.service.loadClient(ok, this.state, id_client);
    }

    prepareInsertClient(event) {
        event.preventDefault();
        var client          = new Client();
        client.name_client  = document.querySelector("#name_client").value;
        client.phone_nro    = document.querySelector("#phone_nro").value;
        client.email        = document.querySelector("#email").value;
        client.pwd          = document.querySelector("#pwd").value;
        const ok            = ()  => this.crudResponse("<h1>Registro Incluído com Sucesso</h1>");
        this.service.insertClient(ok, this.state, client);
    }

    prepareEditClient(event) {
        event.preventDefault();
        var client          = new Client();
        client.id_client    = document.querySelector("#id_client").value;
        client.name_client  = document.querySelector("#name_client").value;
        client.phone_nro    = document.querySelector("#phone_nro").value;
        client.email        = document.querySelector("#email").value;
        client.pwd          = document.querySelector("#pwd").value;
        const ok            = () => this.crudResponse("<h1>Registro Alterado com Sucesso</h1>");
        this.service.editClient(ok, this.state, client);
    }

    prepareDeleteClient(event) {
        event.preventDefault();
        var id_client       = document.querySelector("#id_client").value;
        const ok            = () => this.crudResponse("<h1>Registro Excluído com Sucesso</h1>");
        this.service.deleteClient(ok, this.state, id_client);
    }

    loadProducts() {
        const self  = this;
        const ok    = products  =>  self.productView.createProductsArea(products, this.cleanContentbox);
        this.service.loadProducts(ok, this.state);
    }

    loadOrders() {
        const self  = this;
        const ok    = orders   =>  self.orderView.createOrdersArea(orders, this.cleanContentbox);
        this.service.loadOrders(ok, this.state);
    }

    cleanContentbox () {
        document.querySelector(this.mainArea).innerHTML = "";
    }

    crudResponse (msg) {
        document.querySelector(this.mainArea).innerHTML = msg;
    }
}