const express = require("express");
const routerAPI = express.Router();
const paymentController = require("../controllers/payment.controller");
const vnpayController = require("../controllers/vnpay.controller");

routerAPI.post("/", paymentController.createPaymentAPI);
routerAPI.put("/", paymentController.updatePaymentAPI);
routerAPI.get("/id/:id", paymentController.getPaymentAPI);
routerAPI.get("/userId/:id", paymentController.getPaymentByUserIdAPI);
routerAPI.get("/", paymentController.getAllPaymentsAPI);
routerAPI.delete("/id/:id", paymentController.deletePaymentAPI);
routerAPI.get("/paginate", paymentController.getPaymentWithPaginationAPI);

routerAPI.post("/vnpay/create", vnpayController.createVNPayPaymentAPI);
routerAPI.get("/vnpay/return", vnpayController.getVNPayPaymentReturnAPI);

module.exports = routerAPI;
