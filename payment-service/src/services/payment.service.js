const Payment = require("../models/payment");

const createPayment = async (payment) => {
  try {
    const newPayment = await Payment.create(payment);
    return {
      status: true,
      EC: 0,
      message: "Create payment successfully!",
      data: newPayment,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Create payment failed! (SERVER)",
      data: null,
    };
  }
};

const updatePayment = async (id, updateData) => {
  try {
    const updated = await Payment.updateOne({ _id: id }, updateData);
    return {
      status: true,
      EC: 0,
      message: "Update payment successfully!",
      data: updated,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Update payment failed (SERVER)!",
      data: null,
    };
  }
};

const getPayment = async (id) => {
  try {
    const payment = await Payment.findById(id);
    if (!payment) {
      return {
        status: false,
        EC: 1,
        message: "Payment not exists in system",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Get payment successfully!",
      data: payment,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Get payment failed (SERVER)!",
      data: null,
    };
  }
};

const deletePayment = async (id) => {
  try {
    const result = await Payment.deleteOne({ _id: id });
    return {
      status: true,
      EC: 0,
      message: "Delete payment successfully!",
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Delete payment failed (SERVER)!",
      data: null,
    };
  }
};

const getAllPayments = async () => {
  try {
    const list = await Payment.find({});
    return {
      status: true,
      EC: 0,
      message: "Get list payments successfully!",
      data: list,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Get list payments failed (SERVER)!",
      data: null,
    };
  }
};

module.exports = {
  createPayment,
  updatePayment,
  getPayment,
  deletePayment,
  getAllPayments,
};
