const vnpayService = require("../services/vnpay.service");
const Payment = require("../models/payment");

const createVNPayPaymentAPI = async (req, res) => {
  try {
    const { amount, id } = req.body;
    const result = await vnpayService.createVNPayPayment(amount, id);
    if (!result.status) {
      return res.status(500).json(result);
    }
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};

const getVNPayPaymentReturnAPI = async (req, res) => {
  try {
    const { hashOK, success, data } = vnpayService.verifyReturnParams(
      req.query
    );
    if (!hashOK) {
      console.warn("VNPay return: invalid secure hash", { query: req.query });
      return res.status(400).send("Invalid signature");
    }
    const feResult =
      `${process.env.FE_RESULT_URL}/${req.query.vnp_OrderInfo}` ||
      `https://localhost:5173/checkout/success/${req.query.vnp_OrderInfo}`;
    const feResultFailed =
      process.env.FE_RESULT_URL_FAILED ||
      "https://localhost:5173/checkout/failed";

    if (!success) {
      console.warn("VNPay return: payment failed", { query: req.query });
      return res.redirect(feResultFailed);
    }
    const updatePayment = await Payment.findByIdAndUpdate(
      req.query.vnp_OrderInfo,
      {
        status: "paid",
      }
    );

    await updatePayment.save();

    return res.redirect(feResult);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: "Failed",
      data: null,
    });
  }
};
module.exports = { createVNPayPaymentAPI, getVNPayPaymentReturnAPI };
