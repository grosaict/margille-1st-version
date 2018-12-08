class MargilleHttpService{
    constructor(){
        this.uriClient  = "http://localhost:1234/client";
        this.uriProduct = "http://localhost:1234/product";
        this.uriOrder   = "http://localhost:1234/order";
    }

    loadClients(ok, state) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                ok(JSON.parse(this.responseText));
            }
            else if (this.status !== 200){
                state(this.status);
            }
        };
        xhttp.open("GET", this.uriClient, true);
        xhttp.send();
    }

    loadClient(ok, state, id_client) {
        var newUri = this.uriClient + "/" + id_client;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                try {
                    ok(JSON.parse(this.responseText));
                } catch (e) {
                    ok(null);
                }
            }
            else if (this.status !== 200){
                state(this.status);
            }
        };
        xhttp.open("GET", newUri, true);
        xhttp.send();
    }

    insertClient(ok, state, client) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 201) {
                ok();
            }
            else if(this.status !== 201){
                state(this.status);
            }
        };
        xhttp.open("POST", this.uriClient, true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.send(JSON.stringify(client));
    }

    editClient(ok, state, client) {
        var newUri = this.uriClient + "/" + client.id_client;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 202) {
                ok();
            }
            else if(this.status !== 202){
                state(this.status);
            }
        };
        xhttp.open("PUT", newUri, true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.send(JSON.stringify(client));
    }

    deleteClient(ok, state, id_client) {
        var newUri = this.uriClient + "/" + id_client;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 202) {
                ok();
            }
            else if(this.status !== 202){
                state(this.status);
            }
        };
        xhttp.open("DELETE", newUri, true);
        xhttp.send();
    }

    loadProducts(ok, state) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                ok(JSON.parse(this.responseText));
            }
            else if (this.status !== 200){
                state(this.status);
            }
        };
        xhttp.open("GET", this.uriProduct, true);
        xhttp.send();
    }

    loadProduct(ok, state, id_product) {
        var newUri = this.uriProduct + "/" + id_product;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                try {
                    ok(JSON.parse(this.responseText));
                } catch (e) {
                    ok(null);
                }
            }
            else if (this.status !== 200){
                state(this.status);
            }
        };
        xhttp.open("GET", newUri, true);
        xhttp.send();
    }

    insertProduct(ok, state, product) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 201) {
                ok();
            }
            else if(this.status !== 201){
                state(this.status);
            }
        };
        xhttp.open("POST", this.uriProduct, true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.send(JSON.stringify(product));
    }

    editProduct(ok, state, product) {
        var newUri = this.uriProduct + "/" + product.id_product;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 202) {
                ok();
            }
            else if(this.status !== 202){
                state(this.status);
            }
        };
        xhttp.open("PUT", newUri, true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.send(JSON.stringify(product));
    }

    deleteProduct(ok, state, id_product) {
        var newUri = this.uriProduct + "/" + id_product;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 202) {
                ok();
            }
            else if(this.status !== 202){
                state(this.status);
            }
        };
        xhttp.open("DELETE", newUri, true);
        xhttp.send();
    }

    loadOrders(ok, state) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                ok(JSON.parse(this.responseText));
            }
            else if (this.status !== 200){
                state(this.status);
            }
        };
        xhttp.open("GET", this.uriOrder, true);
        xhttp.send();
    }
}