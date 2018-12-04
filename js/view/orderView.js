class OrderView {
    constructor(tableSelector) {
        this.table = tableSelector;
    }

    createOrdersArea (orders, func) {
        document.querySelector(this.table).innerHTML = this.areaTemplate(orders);
        document.querySelector(".insertButton").addEventListener("click", func);
    }

    areaTemplate (jsonObject){
        return `<h2>Lista de Pedidos</h2>
                <div class="insertButton">Novo Pedido</div>
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