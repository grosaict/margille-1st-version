class OrderView {
    constructor(mainAreaSelector, thisController) {
        this.mainArea   = mainAreaSelector;
        this.controller = thisController;
        this.orderForm  =   `<form class="my_form form1">
                                <div>
                                    <div class="input_form">
                                        <label for="id_client">Código do Cliente</label>
                                        <input type="number" name="id_client" id="id_client" class="data_form" required>
                                    </div>
                                    <div class="input_form">
                                        <label>Nome do Cliente</label>
                                        <input id="name_client">
                                    </div>
                                    <div class="input_form">
                                        <label>Total do Pedido</label>
                                        <input id="order_amount">
                                    </div>
                                </div>
                                <input type="submit" name="confirmar" value="Confirmar" id="my_submit">
                                <input type="reset" name="limpar" value="Limpar" id="my_reset">
                            </form>`;
        this.askForm    =   `<form class="my_form form2">
                                <div class="input_form">
                                    <label for="id_order">Digite o Código</label>
                                    <input type="number" name="id_order" id="id_order" class="data_form2" required>
                                </div>
                                <input type="submit" name="enviar" value="Enviar" id="my_submit2">
                                <input type="reset" name="limpar" value="Limpar">
                            </form>
                            <div id="orderSummary"></div>`;
    }

    createOrdersArea (orders) {
        document.querySelector(this.mainArea).innerHTML = this.areaTemplate(orders);
        //document.querySelector(".insertButton").addEventListener("click", this.insertOrderForm.bind(this));
        //document.querySelector(".editButton").addEventListener("click", this.editOrderForm.bind(this));
        document.querySelector(".excluirButton").addEventListener("click", this.deleteOrderForm.bind(this));
    }

    areaTemplate (jsonObject){
        return `<h2>Lista de Pedidos</h2>
                <div class="crudButton insertButton">Novo Pedido</div>
                <div class="crudButton editButton">Editar Pedido</div>
                <div class="crudButton excluirButton">Excluir Pedido</div>
                <table>
                    <thead id="theadOrder">
                        <tr>
                            <th>Codigo</th>
                            <th>Status</th>
                            <th>Cliente</th>
                            <th>Total Pedido</th>
                        </tr>
                    </thead>
                    <thead id="theadProductOrder">
                        <tr>
                            <th>Codigo</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Preço Unitário</th>
                            <th>Quantidade</th>
                            <th>Preço Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${jsonObject.map(order =>
                        `<tr class="trOrder">
                            <td>${order.id_order}</td>
                            <td>${order.order_status}</td>
                            <td>${order.client.name_client}</td>
                            <td>${order.order_amount}</td>
                        </tr>
                             <tbody>
                                ${order.products_order.map(productorder =>
                                    `<tr>
                                        <td>${productorder.product.id_product}</td>
                                        <td>${productorder.product.product_tag}</td>
                                        <td>${productorder.product.product_description}</td>
                                        <td>${productorder.product.product_price}</td>
                                        <td>${productorder.qtd_product}</td>
                                        <td>${productorder.product_amount}</td>
                                    </tr>
                                    `).join('')}
                            </tbody>
                        `).join('')}
                    </tbody>
                </table>`;
    }

    orderView (order) {
        return  `<table>
                    <thead id="theadOrder">
                        <tr>
                            <th>Nome do Cliente</th>
                            <th>Valor Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${order.client.name_client}</td>
                            <td>${order.order_amount}</td>
                        </tr>
                    </tbody>
                <table>
                    <thead id="theadProductOrder">
                        <tr>
                            <th>Codigo</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Preço Unitário</th>
                            <th>Quantidade</th>
                            <th>Preço Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.products_order.map(productorder =>
                        `<tr>
                            <td>${productorder.product.id_product}</td>
                            <td>${productorder.product.product_tag}</td>
                            <td>${productorder.product.product_description}</td>
                            <td>${productorder.product.product_price}</td>
                            <td>${productorder.qtd_product}</td>
                            <td>${productorder.product_amount}</td>
                        </tr>`).join('')}
                    <tbody>
                </table>`;
    }

    // insertClientForm (){
    //     document.querySelector(this.mainArea).innerHTML = `<h2>Cadastrar Cliente</h2>` + this.clientForm;
    //     document.querySelector(".form1").addEventListener("submit", this.controller.prepareInsertClient.bind(this.controller));
    // }

    // editClientForm () {
    //     document.querySelector(this.mainArea).innerHTML = `<h2>Editar Cliente</h2>` + this.askForm;
    //     document.querySelector(".form2").addEventListener("submit", this.controller.loadClient.bind(this.controller));

    //     document.querySelector("#contentbox2").innerHTML    = `<h2>Cliente</h2>` + this.clientForm;
    //     document.querySelector("#my_submit").style.display  = "none";
    //     document.querySelector("#my_reset").style.display   = "none";
    //     document.querySelector(".form1").addEventListener("submit", this.controller.prepareEditClient.bind(this.controller));
    // }

    deleteOrderForm () {
        document.querySelector(this.mainArea).innerHTML     = `<h2>Excluir Pedido</h2>` + this.askForm;
        document.querySelector(".form2").addEventListener("submit", this.controller.loadOrder.bind(this.controller));

        document.querySelector("#orderSummary").innerHTML   = `<h2>Pedido</h2>` + this.orderForm;
        document.querySelector("#my_submit").style.display  = "none";
        document.querySelector("#my_reset").style.display   = "none";
        document.querySelector(".form1").addEventListener("submit", this.controller.prepareDeleteOrder.bind(this.controller));
    }
}