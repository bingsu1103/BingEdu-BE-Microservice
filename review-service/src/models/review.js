const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    userName: String,
    courseID: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
    },
    comment: String,
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
