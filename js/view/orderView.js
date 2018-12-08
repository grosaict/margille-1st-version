class OrderView {
    constructor(mainAreaSelector, thisController) {
        this.mainArea   = mainAreaSelector;
        this.controller = thisController;
        this.clientForm =  `<form class="my_form form1">
                                <div id="lock_form">
                                    <div class="input_form">
                                        <label for="name_client">Nome</label>
                                        <input type="text" name="name_client" id="name_client" class="data_form" required>
                                    </div>
                                    <div class="input_form">
                                        <label for="phone_nro">Celular</label>
                                        <input type="number" name="phone_nro" id="phone_nro" class="data_form" required>
                                    </div>
                                    <div class="input_form">
                                        <label for="email">e-mail</label>
                                        <input type="email" name="email" id="email" class="data_form" required>
                                    </div>
                                    <div class="input_form">
                                        <label for="pwd">Senha</label>
                                        <input type="password" name="pwd" id="pwd" class="data_form" required>
                                    </div>
                                </div>
                                <input type="submit" name="confirmar" value="Confirmar" id="my_submit">
                                <input type="reset" name="limpar" value="Limpar" id="my_reset">
                            </form>`;
        this.askForm    =  `<form class="my_form form2">
                                <div class="input_form">
                                    <label for="id_client">Digite o Código</label>
                                    <input type="number" name="id_client" id="id_client" class="data_form2" required>
                                </div>
                                <input type="submit" name="enviar" value="Enviar" id="my_submit2">
                                <input type="reset" name="limpar" value="Limpar">
                            </form>
                            <div id="contentbox2"></div>`;
    }

    createOrdersArea (orders) {
        document.querySelector(this.mainArea).innerHTML = this.areaTemplate(orders);
        //document.querySelector(".insertButton").addEventListener("click", this.insertClientForm.bind(this));
        //document.querySelector(".editButton").addEventListener("click", this.editClientForm.bind(this));
        //document.querySelector(".excluirButton").addEventListener("click", this.deleteClientForm.bind(this));
    }

    areaTemplate (jsonObject){
        return `<h2>Lista de Pedidos</h2>
                <div class="crudButton insertButton">Novo Pedido</div>
                <div class="crudButton editButton">Editar Pedido</div>
                <div class="crudButton excluirButton">Excluir Pedido</div>
                <table>
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Status</th>
                            <th>Cliente</th>
                            <th>Total Pedido</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${jsonObject.map(order =>
                            `<tr>
                                <td>${order.id_order}</td>
                                <td>${order.order_status}</td>
                                <td>${order.client.name_client}</td>
                                <td>${order.order_amount}</td>
                            </tr>
                            `).join('')}
                    </tbody>
                </table>`;
    }
}