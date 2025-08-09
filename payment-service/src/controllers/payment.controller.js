const paymentService = require("../services/payment.service");

const createPaymentAPI = async (req, res) => {
  try {
    const data = req.body;
    const result = await paymentService.createPayment(data);
    if (!result.status) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Error from server!",
      data: null,
    });
  }
};

const updatePaymentAPI = async (req, res) => {
  try {
    const { id, ...data } = req.body;
    if (!id) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing id",
        data: null,
      });
    }
    const result = await paymentService.updatePayment(id, data);
    return res.status(result.status ? 200 : 500).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Error from server!",
      data: null,
    });
  }
};

const getPaymentAPI = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing id",
        data: null,
      });
    }
    const result = await paymentService.getPayment(id);
    return res.status(result.status ? 200 : 500).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Error from server!",
      data: null,
    });
  }
};

const getPaymentByUserIdAPI = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing id",
        data: null,
      });
    }
    const result = await paymentService.getPaymentByUserId(id);
    return res.status(result.status ? 200 : 500).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Error from server!",
      data: null,
    });
  }
};

const deletePaymentAPI = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing id",
        data: null,
      });
    }
    const result = await paymentService.deletePayment(id);
    return res.status(result.status ? 200 : 500).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Error from server!",
      data: null,
    });
  }
};

const getAllPaymentsAPI = async (req, res) => {
  try {
    const result = await paymentService.getAllPayments();
    return res.status(result.status ? 200 : 500).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};

const getPaymentWithPaginationAPI = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    if (!page || !limit) {
      return res.status(400).json({
        status: false,
        EC: -2,
        message: "Missing required query params: page or limit",
        data: null,
      });
    }

    const result = await paymentService.getPaymentWithPagination({
      page: parseInt(page),
      limit: parseInt(limit),
      search,
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Pagination failed",
      data: null,
    });
  }
};

module.exports = {
  createPaymentAPI,
  updatePaymentAPI,
  getPaymentAPI,
  deletePaymentAPI,
  getAllPaymentsAPI,
  getPaymentByUserIdAPI,
  getPaymentWithPaginationAPI,
};
