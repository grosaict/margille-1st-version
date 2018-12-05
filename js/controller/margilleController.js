class MargilleController {
    constructor(){
        this.service        = new MargilleHttpService();
        this.clientView     = new ClientView('#contentbox', this);
        this.productView    = new ProductView('#contentbox');
        this.orderView      = new OrderView('#contentbox');
    }

    loadClients() {
        const self  = this;
        const ok    = clients   =>  self.clientView.createClientsArea(clients);
        const erro  = status    =>  console.log("Error: " + status);
        this.service.loadClients(ok, erro);
    }

    prepareClient(event) {
        console.log(">>> Y <<<");
        event.preventDefault();
        var client          = {};
        client.name_client  = document.querySelector("#name_client").value;
        client.phone_nro    = document.querySelector("#phone_nro").value;
        client.email        = document.querySelector("#email").value;
        client.pwd          = document.querySelector("#pwd").value;
        console.log(client);
        console.log(">>> Z <<<");
        const ok = function(){
            console.log("OK: testando");
        }
        const erro = function(status){
            console.log("Error: "+status);
        }
        this.service.insertClient(client, ok, erro);
    }

    loadProducts() {
        const self  = this;
        const ok    = products   =>  self.productView.createProductsArea(products, this.cleanContentbox);
        const erro  = status    =>  console.log("Error: " + status);
        this.service.loadProducts(ok, erro);
        /* essa arrow function acima é o mesmo que:
        const ok = function (products) {
                self.clientView.createProductsArea(products, this.cleanContentbox)
        }    */
    }

    loadOrders() {
        const self  = this;
        const ok    = orders   =>  self.orderView.createOrdersArea(orders, this.cleanContentbox);
        const erro  = status    =>  console.log("Error: " + status);
        this.service.loadOrders(ok, erro);
    }

    cleanContentbox () {
        document.querySelector("#contentbox").innerHTML = "";
    }
}