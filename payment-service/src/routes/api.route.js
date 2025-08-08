const express = require("express");
const routerAPI = express.Router();
const paymentController = require("../controllers/payment.controller");

routerAPI.post("/", paymentController.createPaymentAPI);
routerAPI.put("/", paymentController.updatePaymentAPI);
routerAPI.get("/id/:id", paymentController.getPaymentAPI);
routerAPI.get("/", paymentController.getAllPaymentsAPI);
routerAPI.delete("/id/:id", paymentController.deletePaymentAPI);

module.exports = routerAPI;
