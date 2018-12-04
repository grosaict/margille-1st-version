class ClientView {
    constructor(tableSelector) {
        this.table = tableSelector;
    }

    createClientsArea (clients, func) {
        document.querySelector(this.table).innerHTML = this.areaTemplate(clients);
        document.querySelector(".insertButton").addEventListener("click", func);
    }

    areaTemplate (jsonObject){
        return `<h2>Lista de Clientes</h2>
                <div class="insertButton">Novo Cliente</div>
                <table>
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nome</th>
                            <th>Telefone</th>
                            <th>e-mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${jsonObject.map(client =>
                            `<tr>
                                <td>${client.id_client}</td>
                                <td>${client.name_client}</td>
                                <td>${client.phone_nro}</td>
                                <td>${client.email}</td>
                            </tr>
                            `).join('')}
                    </tbody>
                </table>`;
    }
}