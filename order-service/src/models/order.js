const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
