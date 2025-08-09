const express = require("express");
const routerAPI = express.Router();
const orderController = require("../controllers/order.controller");

routerAPI.post("/", orderController.createOrderAPI);
routerAPI.put("/", orderController.updateOrderAPI);
routerAPI.get("/userId/:id", orderController.getOrderByUserIdAPI);
routerAPI.get("/id/:id", orderController.getOrderAPI);
routerAPI.get("/", orderController.getAllOrdersAPI);
routerAPI.delete("/id/:id", orderController.deleteOrderAPI);

module.exports = routerAPI;
