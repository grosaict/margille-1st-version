class MargilleController {
    constructor(){
        this.mainArea       = "#contentbox";
        this.service        = new MargilleHttpService();
        this.clientView     = new ClientView(this.mainArea, this);
        this.productView    = new ProductView(this.mainArea, this);
        this.orderView      = new OrderView(this.mainArea, this);
        this.state          = status    =>  console.log("Estado HTTP: " + status);
    }

    loadClients() {
        const self  = this;
        const ok    = clients   =>  self.clientView.createClientsArea(clients);
        this.service.loadClients(ok, this.state);
        /* essa arrow function acima é o mesmo que:
        const ok    = function (clients) {
            self.clientView.createClientsArea(clients);
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
                self.updateContentbox("<h1>Cliente não Encontrado</h1>");
            }
        }
        document.querySelector(".data_form2").disabled = "true";
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
        const ok            = ()  => this.updateContentbox("<h1>Registro Incluído com Sucesso</h1>");
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
        const ok            = () => this.updateContentbox("<h1>Registro Alterado com Sucesso</h1>");
        this.service.editClient(ok, this.state, client);
    }

    prepareDeleteClient(event) {
        event.preventDefault();
        var id_client       = document.querySelector("#id_client").value;
        const ok            = () => this.updateContentbox("<h1>Registro Excluído com Sucesso</h1>");
        this.service.deleteClient(ok, this.state, id_client);
    }

    loadProducts() {
        const self  = this;
        const ok    = products  =>  self.productView.createProductsArea(products, this.updateContentbox(""));
        this.service.loadProducts(ok, this.state);
    }

    loadProduct() {
        event.preventDefault();
        const self      = this;
        const ok        = function (product) {
            if (product != null) {
                document.querySelector("#my_submit").style.display      = "block";
                document.querySelector("#product_tag").value            = product.product_tag;
                document.querySelector("#product_description").value    = product.product_description;
                document.querySelector("#product_price").value          = product.product_price;
            } else {
                self.updateContentbox("<h1>Produto não Encontrado</h1>");
            }
        }
        document.querySelector(".data_form2").disabled = "true";
        var id_product   = document.querySelector("#id_product").value;
        this.service.loadProduct(ok, this.state, id_product);
    }

    prepareInsertProduct(event) {
        event.preventDefault();
        var product                 = new Product();
        product.product_tag         = document.querySelector("#product_tag").value;
        product.product_description = document.querySelector("#product_description").value;
        product.product_price       = document.querySelector("#product_price").value;
        const ok                    = ()  => this.updateContentbox("<h1>Registro Incluído com Sucesso</h1>");
        this.service.insertProduct(ok, this.state, product);
    }

    prepareEditProduct(event) {
        event.preventDefault();
        var product                 = new Product();
        product.id_product          = document.querySelector("#id_product").value;
        product.product_tag         = document.querySelector("#product_tag").value;
        product.product_description = document.querySelector("#product_description").value;
        product.product_price       = document.querySelector("#product_price").value;
        const ok                    = () => this.updateContentbox("<h1>Registro Alterado com Sucesso</h1>");
        this.service.editProduct(ok, this.state, product);
    }

    prepareDeleteProduct(event) {
        event.preventDefault();
        var id_product              = document.querySelector("#id_product").value;
        const ok                    = () => this.updateContentbox("<h1>Registro Excluído com Sucesso</h1>");
        this.service.deleteProduct(ok, this.state, id_product);
    }

    loadOrders() {
        const self  = this;
        const ok    = orders   =>  self.orderView.createOrdersArea(orders, this.updateContentbox(""));
        this.service.loadOrders(ok, this.state);
    }

    loadOrder() {
        event.preventDefault();
        const self      = this;
        const ok        = function (order) {
            if (order != null) {
                document.querySelector(".form1").style.display     = "block";
                document.querySelector("#orderSummary").innerHTML   = self.orderView.orderView(order);
                return order;
            } else {
                self.updateContentbox("<h1>Pedido não Encontrado</h1>");
            }
        }
        document.querySelector(".data_form2").disabled = "true";
        var id_order   = document.querySelector("#id_order").value;
        this.service.loadOrder(ok, this.state, id_order);
    }

    prepareInsertOrder(event) {
        event.preventDefault();
        var order           = new Order();
        var pOrder          = new ProductOrder();
        order.id_client     = document.querySelector("#id_client").value;
        order.productOrder  = [];
        pOrder.id_product   = document.querySelector("#id_product1").value;
        pOrder.qtd_product  = document.querySelector("#qtd_product1").value;
        order.productOrder.push(pOrder);
        if (document.querySelector("#id_product2").value != "" && document.querySelector("#qtd_product2").value != "") {
            var pOrder          = new ProductOrder();
            pOrder.id_product   = document.querySelector("#id_product2").value;
            pOrder.qtd_product  = document.querySelector("#qtd_product2").value;
            order.productOrder.push(pOrder);
        }
        if (document.querySelector("#id_product3").value != "" && document.querySelector("#qtd_product3").value != "") {
            var pOrder          = new ProductOrder();
            pOrder.id_product   = document.querySelector("#id_product3").value;
            pOrder.qtd_product  = document.querySelector("#qtd_product3").value;
            order.productOrder.push(pOrder);
        }
        const ok            = ()  => this.updateContentbox("<h1>Registro Incluído com Sucesso</h1>");
        this.service.insertOrder(ok, this.state, order);
    }

    prepareEditOrder(event) {
        event.preventDefault();
        var order           = new Order();
        var pOrder          = new ProductOrder();
        order.id_order      = document.querySelector("#id_order").value;
        order.id_client     = document.querySelector("#id_client").value;
        order.productOrder  = [];
        pOrder.id_product   = document.querySelector("#id_product1").value;
        pOrder.qtd_product  = document.querySelector("#qtd_product1").value;
        order.productOrder.push(pOrder);
        if (document.querySelector("#id_product2").value != "" && document.querySelector("#qtd_product2").value != "") {
            var pOrder          = new ProductOrder();
            pOrder.id_product   = document.querySelector("#id_product2").value;
            pOrder.qtd_product  = document.querySelector("#qtd_product2").value;
            order.productOrder.push(pOrder);
        }
        if (document.querySelector("#id_product3").value != "" && document.querySelector("#qtd_product3").value != "") {
            var pOrder          = new ProductOrder();
            pOrder.id_product   = document.querySelector("#id_product3").value;
            pOrder.qtd_product  = document.querySelector("#qtd_product3").value;
            order.productOrder.push(pOrder);
        }
        const ok                    = () => this.updateContentbox("<h1>Registro Alterado com Sucesso</h1>");
        this.service.editOrder(ok, this.state, order);
    }

    prepareDeleteOrder(event) {
        event.preventDefault();
        var id_order                = document.querySelector("#id_order").value;
        const ok                    = () => this.updateContentbox("<h1>Registro Excluído com Sucesso</h1>");
        this.service.deleteOrder(ok, this.state, id_order);
    }

    updateContentbox (msg) {
        document.querySelector(this.mainArea).innerHTML = msg;
    }
}