class ProductView {
    constructor(mainAreaSelector, thisController) {
        this.mainArea     = mainAreaSelector;
        this.controller   = thisController;
        this.productForm = `<form class="my_form form1">
                                <div id="lock_form">
                                    <div class="input_form">
                                        <label for="product_tag">Nome</label>
                                        <input type="text" name="product_tag" id="product_tag" class="data_form" required>
                                    </div>
                                    <div class="input_form">
                                        <label for="product_description">Descrição</label>
                                        <input type="text" name="product_description" id="product_description" class="data_form" required>
                                    </div>
                                    <div class="input_form">
                                        <label for="product_price">Preço</label>
                                        <input type="number" name="product_price" id="product_price" class="data_form" step=".01" required>
                                    </div>
                                </div>
                                <input type="submit" name="confirmar" value="Confirmar" id="my_submit">
                                <input type="reset" name="limpar" value="Limpar" id="my_reset">
                            </form>`;
        this.askForm    =  `<form class="my_form form2">
                                <div class="input_form">
                                    <label for="id_product">Digite o Código</label>
                                    <input type="number" name="id_product" id="id_product" class="data_form2" required>
                                </div>
                                <input type="submit" name="enviar" value="Enviar" id="my_submit2">
                                <input type="reset" name="limpar" value="Limpar">
                            </form>
                            <div id="contentbox2"></div>`;
    }

    createProductsArea (products) {
        document.querySelector(this.mainArea).innerHTML = this.areaTemplate(products);
        document.querySelector(".insertButton").addEventListener("click", this.insertProductForm.bind(this));
        document.querySelector(".editButton").addEventListener("click", this.editProductForm.bind(this));
        document.querySelector(".deleteButton").addEventListener("click", this.deleteProductForm.bind(this));
    }

    areaTemplate (jsonObject){
        return `<h2>Lista de Produtos</h2>
                <div class="crudButton insertButton">Novo Produto</div>
                <div class="crudButton editButton">Editar Produto</div>
                <div class="crudButton deleteButton">Excluir Produto</div>
                <table>
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Peço Unitário</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${jsonObject.map(product =>
                            `<tr>
                                <td>${product.id_product}</td>
                                <td>${product.product_tag}</td>
                                <td>${product.product_description}</td>
                                <td>${product.product_price}</td>
                            </tr>
                            `).join('')}
                    </tbody>
                </table>`;
    }

    insertProductForm (){
        document.querySelector(this.mainArea).innerHTML = `<h2>Cadastrar Produto</h2>` + this.productForm;
        document.querySelector(".form1").addEventListener("submit", this.controller.prepareInsertProduct.bind(this.controller));
    }

    editProductForm () {
        document.querySelector(this.mainArea).innerHTML = `<h2>Editar Produto</h2>` + this.askForm;
        document.querySelector(".form2").addEventListener("submit", this.controller.loadProduct.bind(this.controller));

        document.querySelector("#contentbox2").innerHTML    = `<h2>Produto</h2>` + this.productForm;
        document.querySelector("#my_submit").style.display  = "none";
        document.querySelector("#my_reset").style.display   = "none";
        document.querySelector(".form1").addEventListener("submit", this.controller.prepareEditProduct.bind(this.controller));
    }

    deleteProductForm () {
        document.querySelector(this.mainArea).innerHTML     = `<h2>Excluir Produto</h2>` + this.askForm;
        document.querySelector(".form2").addEventListener("submit", this.controller.loadProduct.bind(this.controller));

        document.querySelector("#contentbox2").innerHTML    = `<h2>Produto</h2>` + this.productForm;
        document.querySelector("#my_submit").style.display  = "none";
        document.querySelector("#my_reset").style.display   = "none";
        document.querySelector(".form1").addEventListener("submit", this.controller.prepareDeleteProduct.bind(this.controller));
    }
}