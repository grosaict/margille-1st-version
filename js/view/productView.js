class ProductView {
    constructor(tableSelector) {
        this.table = tableSelector;
    }

    createProductsArea (products, func) {
        document.querySelector(this.table).innerHTML = this.areaTemplate(products);
        document.querySelector(".insertButton").addEventListener("click", func);
    }

    areaTemplate (jsonObject){
        return `<h2>Lista de Produtos</h2>
                <div class="insertButton">Novo Produto</div>
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
}