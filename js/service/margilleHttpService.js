class MargilleHttpService{
    constructor(){
        this.uriClient  = "http://localhost:1234/client";
        this.uriProduct = "http://localhost:1234/product";
        this.uriOrder   = "http://localhost:1234/order";
    }

    loadClients(ok, error) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                ok(JSON.parse(this.responseText));
            }
            else if (this.status !== 200){
                error(this.status);
            }
        };
        xhttp.open("GET", this.uriClient, true);
        xhttp.send();
    }

    insertClient(client, ok, error) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 201) {
                ok();
            }
            else if(this.status !== 201){
                error(this.status);
            }
        };
        xhttp.open("POST", this.uriClient, true);
        xhttp.setRequestHeader("Content-Type","application/json");
        xhttp.send(JSON.stringify(client));
    }

    loadProducts(ok, error) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                ok(JSON.parse(this.responseText));
            }
            else if (this.status !== 200){
                error(this.status);
            }
        };
        xhttp.open("GET", this.uriProduct, true);
        xhttp.send();
    }

    loadOrders(ok, error) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                ok(JSON.parse(this.responseText));
            }
            else if (this.status !== 200){
                error(this.status);
            }
        };
        xhttp.open("GET", this.uriOrder, true);
        xhttp.send();
    }
}