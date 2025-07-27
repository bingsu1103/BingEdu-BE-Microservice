const userService = require("../services/user.service");

const createUserAPI = async (req, res) => {
  try {
    const user = req.body;
    const result = await userService.createUser(user);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Failed to create user",
      data: null,
    });
  }
};
const getAllUserAPI = async (req, res) => {
  try {
    const { page, limit, search } = req.query;

    const listUser = await userService.getAllUser(page, limit, search);
    return res.status(200).json(listUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Failed to get all user",
      data: null,
    });
  }
};

const getAUserAPI = async (req, res) => {
  try {
    const user = await userService.getAUser(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Failed to get a user",
      data: null,
    });
  }
};

const getAUserEmailAPI = async (req, res) => {
  try {
    const email = req.params.email;
    if (!email) {
      return res.status(400).json({
        status: false,
        EC: -1,
        message: "Email Missing",
        data: null,
      });
    }
    const user = await userService.getAUserByEmail(email);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Failed to get a user",
      data: null,
    });
  }
};

const updateUserAPI = async (req, res) => {
  try {
    const user = await userService.updateUser(req.body);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Failed to update a user",
      data: null,
    });
  }
};
const deleteUserAPI = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Failed to get a user",
      data: null,
    });
  }
};
const isPasswordMatchAPI = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.isPasswordMatch(email, password);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER",
      data: null,
    });
  }
};

const updatePasswordAPI = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing email or password",
        data: null,
      });
    }
    const data = await userService.updatePassword(email, newPassword);
    if (!data) {
      return res.status(500).json({
        status: false,
        EC: 1,
        message: "Update password failed",
        data: null,
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Error from server (update password)",
      data: null,
    });
  }
};

const getUserWithPaginationAPI = async (req, res) => {
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

    const result = await userService.getUserWithPagination({
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
  createUserAPI,
  getAllUserAPI,
  getAUserAPI,
  updateUserAPI,
  deleteUserAPI,
  isPasswordMatchAPI,
  getAUserEmailAPI,
  updatePasswordAPI,
  getUserWithPaginationAPI,
};
