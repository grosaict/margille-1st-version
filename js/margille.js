let mController = new MargilleController();

/*var body = document.querySelector("body");
body.onload = function () {
    loadForm();
}*/

document.querySelector(".loadClients").addEventListener("click", mController.loadClients.bind(mController));
document.querySelector(".loadProducts").addEventListener("click", mController.loadProducts.bind(mController));
document.querySelector(".loadOrders").addEventListener("click", mController.loadOrders.bind(mController));

window.addEventListener("load", mController.loadForm(mController));

/*document.querySelector("#formulario").addEventListener("submit", motorController.salvarMotor.bind(motorController));*/