class ClientView {
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

    createClientsArea (clients) {
        document.querySelector(this.mainArea).innerHTML = this.areaTemplate(clients);
        document.querySelector(".insertButton").addEventListener("click", this.insertClientForm.bind(this));
        document.querySelector(".editButton").addEventListener("click", this.editClientForm.bind(this));
        document.querySelector(".excluirButton").addEventListener("click", this.deleteClientForm.bind(this));
    }

    areaTemplate (jsonObject){
        return `<h2>Lista de Clientes</h2>
                <div class="crudButton insertButton">Novo Cliente</div>
                <div class="crudButton editButton">Editar Cliente</div>
                <div class="crudButton excluirButton">Excluir Cliente</div>
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

    insertClientForm (){
        document.querySelector(this.mainArea).innerHTML = `<h2>Cadastrar Cliente</h2>` + this.clientForm;
        document.querySelector(".form1").addEventListener("submit", this.controller.prepareInsertClient.bind(this.controller));
    }

    editClientForm () {
        document.querySelector(this.mainArea).innerHTML = `<h2>Editar Cliente</h2>` + this.askForm;
        document.querySelector(".form2").addEventListener("submit", this.controller.loadClient.bind(this.controller));

        document.querySelector("#contentbox2").innerHTML    = `<h2>Cliente</h2>` + this.clientForm;
        document.querySelector("#my_submit").style.display  = "none";
        document.querySelector("#my_reset").style.display   = "none";
        document.querySelector(".form1").addEventListener("submit", this.controller.prepareEditClient.bind(this.controller));
    }

    deleteClientForm () {
        document.querySelector(this.mainArea).innerHTML     = `<h2>Excluir Cliente</h2>` + this.askForm;
        document.querySelector(".form2").addEventListener("submit", this.controller.loadClient.bind(this.controller));

        document.querySelector("#contentbox2").innerHTML    = `<h2>Cliente</h2>` + this.clientForm;
        document.querySelector("#my_submit").style.display  = "none";
        document.querySelector("#my_reset").style.display   = "none";
        document.querySelector(".form1").addEventListener("submit", this.controller.prepareDeleteClient.bind(this.controller));
    }
}