class OrderView {
    constructor(mainAreaSelector, thisController) {
        this.mainArea   =   mainAreaSelector;
        this.controller =   thisController;
        this.orderForm  =  `<div class="form1">
                                <form class="my_form">
                                    <div class="input_form">
                                        <label for="id_client">Código do Cliente</label>
                                        <input type="number" name="id_client" id="id_client" class="data_form" required>
                                    </div>
                                    <div class="input_form">
                                        <label for="id_product1">Código do Produto 1</label>
                                        <input type="number" name="id_product1" id="id_product1" class="data_form" required>
                                    </div>
                                    <div class="input_form">
                                        <label for="qtd_product1">Quantidade do Produto 1</label>
                                        <input type="number" name="qtd_product1" id="qtd_product1" class="data_form" required>
                                    </div>
                                    <div class="input_form">
                                        <label for="id_product2">Código do Produto 2</label>
                                        <input type="number" name="id_product2" id="id_product2" class="data_form">
                                    </div>
                                    <div class="input_form">
                                        <label for="qtd_product2">Quantidade do Produto 2</label>
                                        <input type="number" name="qtd_product2" id="qtd_product2" class="data_form">
                                    </div>
                                    <div class="input_form">
                                        <label for="id_product3">Código do Produto 3</label>
                                        <input type="number" name="id_product3" id="id_product3" class="data_form">
                                    </div>
                                    <div class="input_form">
                                        <label for="qtd_product3">Quantidade do Produto 3</label>
                                        <input type="number" name="qtd_product3" id="qtd_product3" class="data_form">
                                    </div>
                                    <input type="submit" name="enviar" value="Enviar" id="my_submit">
                                </form>
                            </div>`;
        this.deleteForm =   `<div class="form1">
                                <h2>Pedido</h2>
                                <form class="my_form">
                                    <h4>Confirma a exclusão do pedido abaixo?</h4>
                                    <input type="submit" name="confirmar" value="Confirmar" id="my_submit">
                                </form>
                            </div>`;
        this.askForm    =   `<form class="my_form form2">
                                <div class="input_form">
                                    <label for="id_order">Digite o Código</label>
                                    <input type="number" name="id_order" id="id_order" class="data_form2" required>
                                </div>
                                <input type="submit" name="enviar" value="Enviar" id="my_submit2">
                            </form>
                            <div id="orderConfirmation"></div>
                            <div id="orderSummary"></div>`;
    }

    createOrdersArea (orders) {
        document.querySelector(this.mainArea).innerHTML = this.areaTemplate(orders);
        document.querySelector(".insertButton").addEventListener("click", this.insertOrderForm.bind(this));
        document.querySelector(".editButton").addEventListener("click", this.editOrderForm.bind(this));
        document.querySelector(".deleteButton").addEventListener("click", this.deleteOrderForm.bind(this));
    }

    areaTemplate (jsonObject){
        return `<h2>Lista de Pedidos</h2>
                <div class="crudButton insertButton">Novo Pedido</div>
                <div class="crudButton editButton">Editar Pedido</div>
                <div class="crudButton deleteButton">Excluir Pedido</div>
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
                </table>
                <table>
                    <thead id="theadProductOrder">
                        <tr>
                            <th>Produtos do Pedido</th>
                        </tr>
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

    insertOrderForm (){
        document.querySelector(this.mainArea).innerHTML = `<h2>Cadastrar Pedido</h2>` + this.orderForm;
        document.querySelector(".form1").addEventListener("submit", this.controller.prepareInsertOrder.bind(this.controller));
    }

    editOrderForm () {
        document.querySelector(this.mainArea).innerHTML         = `<h2>Editar Pedido</h2>` + this.askForm;
        document.querySelector(".form2").addEventListener("submit", this.controller.loadOrder.bind(this.controller));

        document.querySelector("#orderConfirmation").innerHTML  = this.orderForm;
        document.querySelector(".form1").style.display          = "none";
        document.querySelector(".form1").addEventListener("submit", this.controller.prepareEditOrder.bind(this.controller));
    }

    deleteOrderForm () {
        document.querySelector(this.mainArea).innerHTML         = `<h2>Excluir Pedido</h2>` + this.askForm;
        document.querySelector(".form2").addEventListener("submit", this.controller.loadOrder.bind(this.controller));

        document.querySelector("#orderConfirmation").innerHTML  = this.deleteForm;
        document.querySelector(".form1").style.display      = "none";
        document.querySelector(".form1").addEventListener("submit", this.controller.prepareDeleteOrder.bind(this.controller));
    }
}