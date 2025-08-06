const reviewService = require("../services/review.service");

const createReviewAPI = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing data",
        data: null,
      });
    }
    const result = await reviewService.createReview(data);
    if (!result.status) {
      return {
        status: false,
        EC: 1,
        message: result.message,
        data: null,
      };
    }
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: "ERROR FROM SERVER!",
      data: null,
    });
  }
};

const updateReviewAPI = async (req, res) => {
  try {
    const { id, ...updateData } = req.body;
    if (!id) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing id",
        data: null,
      });
    }
    const result = await reviewService.updateReview(id, updateData);
    if (!result.status)
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Update review failed!",
        data: null,
      });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};

const deleteReviewAPI = async (req, res) => {
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
    const result = await reviewService.deleteReview(id);
    if (!result.status) {
      return {
        status: false,
        EC: 1,
        message: result.message,
        data: null,
      };
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      EC: -1,
      message: "Delete review failed!",
      data: null,
    });
  }
};

const getReviewAPI = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await reviewService.getReview(id);
    if (!result.status) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: result.message,
        data: null,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};
const getAllReviewsAPI = async (req, res) => {
  try {
    const result = await reviewService.getAllReviews();
    if (!result.status) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: 0,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    });
  }
};

module.exports = {
  getReviewAPI,
  createReviewAPI,
  updateReviewAPI,
  deleteReviewAPI,
  getAllReviewsAPI,
};
