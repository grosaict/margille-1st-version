class ClientView {
    constructor(tableSelector, controller) {
        this.table  = tableSelector;
        this.cont   = controller;
    }

    createClientsArea (clients) {
        document.querySelector(this.table).innerHTML = this.areaTemplate(clients);
        document.querySelector(".insertButton").addEventListener("click", this.clientForm.bind(this));
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

    clientForm (){
        document.querySelector("#contentbox").innerHTML =
            `<h2>Cadastrar Cliente</h2>
            <form class="my_form">
                <div class="input_form">
                    <label for="name_client">Nome</label>
                    <input type="text" name="name_client" id="name_client" class="data_form">
                </div>
                <div class="input_form">
                    <label for="phone_nro">Celular</label>
                    <input type="number" name="phone_nro" id="phone_nro" class="data_form">
                </div>
                <div class="input_form">
                    <label for="email">e-mail</label>
                    <input type="email" name="email" id="email" class="data_form">
                </div>
                <div class="input_form">
                    <label for="pwd">Senha</label>
                    <input type="password" name="pwd" id="pwd" class="data_form">
                </div>
                <input type="submit" name="cadastrar" value="Cadastrar" id="my_submit">
                <input type="reset" name="limpar" value="Limpar">
            </form>`;
        console.log(">>> A <<<");
        console.log(this);
        console.log(this.cont);
        document.querySelector(".my_form").addEventListener("submit", this.cont.prepareClient.bind(this.cont));
        console.log(">>> B <<<");
    }
}