const orderService = require("../services/order.service");

const createOrderAPI = async (req, res) => {
  try {
    const data = req.body;
    const result = await orderService.createOrder(data);
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

const updateOrderAPI = async (req, res) => {
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
    const result = await orderService.updateOrder(id, data);
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

const getOrderAPI = async (req, res) => {
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
    const result = await orderService.getOrder(id);
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

const deleteOrderAPI = async (req, res) => {
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
    const result = await orderService.deleteOrder(id);
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

const getAllOrdersAPI = async (req, res) => {
  try {
    const result = await orderService.getAllOrders();
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

module.exports = {
  createOrderAPI,
  updateOrderAPI,
  getOrderAPI,
  deleteOrderAPI,
  getAllOrdersAPI,
};
