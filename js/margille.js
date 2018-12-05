let mController = new MargilleController();

document.querySelector(".loadClients").addEventListener("click", mController.loadClients.bind(mController));
document.querySelector(".loadProducts").addEventListener("click", mController.loadProducts.bind(mController));
document.querySelector(".loadOrders").addEventListener("click", mController.loadOrders.bind(mController));