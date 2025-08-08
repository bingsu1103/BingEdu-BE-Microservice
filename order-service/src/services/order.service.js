const Order = require("../models/order");

const createOrder = async (order) => {
  try {
    const newOrder = await Order.create(order);
    return {
      status: true,
      EC: 0,
      message: "Create order successfully!",
      data: newOrder,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Create order failed! (SERVER)",
      data: null,
    };
  }
};

const updateOrder = async (id, updateData) => {
  try {
    const updated = await Order.updateOne({ _id: id }, updateData);
    return {
      status: true,
      EC: 0,
      message: "Update order successfully!",
      data: updated,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Update order failed (SERVER)!",
      data: null,
    };
  }
};

const getOrder = async (id) => {
  try {
    const order = await Order.findById(id);
    if (!order) {
      return {
        status: false,
        EC: 1,
        message: "Order not exists in system",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Get order successfully!",
      data: order,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Get order failed (SERVER)!",
      data: null,
    };
  }
};

const deleteOrder = async (id) => {
  try {
    const result = await Order.deleteOne({ _id: id });
    return {
      status: true,
      EC: 0,
      message: "Delete order successfully!",
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Delete order failed (SERVER)!",
      data: null,
    };
  }
};

const getAllOrders = async () => {
  try {
    const list = await Order.find({});
    return {
      status: true,
      EC: 0,
      message: "Get list orders successfully!",
      data: list,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Get list orders failed (SERVER)!",
      data: null,
    };
  }
};

module.exports = {
  createOrder,
  updateOrder,
  getOrder,
  deleteOrder,
  getAllOrders,
};
