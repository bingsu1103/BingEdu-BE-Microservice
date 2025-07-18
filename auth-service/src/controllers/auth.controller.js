const authService = require("../services/auth.service");
const registerAPI = async (req, res) => {
  try {
    const userData = req.body;
    if (!userData.email || !userData.password || !userData.name) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing required fields (email, password, name)",
        data: null,
      });
    }
    const result = await authService.register(userData);
    if (result.status) {
      res.cookie("refresh_token", result.data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }
    return res.status(201).json(result);
  } catch (error) {
    console.error("Register error:", error.message);
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Register failed",
      data: null,
    });
  }
};
const loginAPI = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Email and password are required",
        data: null,
      });
    }

    const result = await authService.login(email, password);

    if (!result.status) {
      return res.status(401).json({
        status: false,
        EC: result.EC || 2,
        message: result.message || "Unauthorized",
        data: null,
      });
    }
    res.cookie("refresh_token", result.data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Login failed",
      data: null,
    });
  }
};
const refreshAccessTokenAPI = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing refresh token",
        data: null,
      });
    }

    const result = await authService.refreshAccessToken(refreshToken);

    if (!result.status) {
      return res.status(401).json({
        status: false,
        EC: result.EC || 2,
        message: result.message || "Unauthorized",
        data: null,
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Refresh token error:", error.message);
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Refresh token failed",
      data: null,
    });
  }
};

const logoutAPI = async (req, res) => {
  try {
    const id = req.user._id;
    if (!id) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing id",
        data: null,
      });
    }
    const result = await authService.logout(id);

    if (!result) {
      return res.status(401).json({
        status: false,
        EC: result.EC || 2,
        message: result.message,
        data: null,
      });
    }
    res.clearCookie("refresh_token");

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Logout failed",
      data: null,
    });
  }
};
const fetchAccountAPI = async (req, res) => {
  try {
    const id = req.user._id;
    if (!id) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing id",
        data: null,
      });
    }

    const result = await authService.fetchAccount(id);
    if (!result) {
      return res.status(401).json({
        status: false,
        EC: result.EC || 2,
        message: result.message,
        data: null,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Fetch account failed",
      data: null,
    });
  }
};
const forgotPasswordAPI = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing email",
        data: null,
      });
    }

    const result = await authService.forgotPassword(email);
    if (!result) {
      return res.status(401).json({
        status: false,
        EC: result.EC || 2,
        message: result.message,
        data: null,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Send request forgot password failed",
      data: null,
    });
  }
};

const verifyOTPAPI = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing email or otp",
        data: null,
      });
    }
    const result = await authService.verifyOTP(email, otp);
    if (!result) {
      return res.status(401).json({
        status: false,
        EC: result.EC || 2,
        message: result.message,
        data: null,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Send request verify OTP failed",
      data: null,
    });
  }
};
const resetPasswordAPI = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({
        status: false,
        EC: 1,
        message: "Missing email or newPassword",
        data: null,
      });
    }
    const result = await authService.resetPassword(email, newPassword);
    if (!result) {
      return res.status(401).json({
        status: false,
        EC: result.EC || 2,
        message: result.message,
        data: null,
      });
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: false,
      EC: -1,
      message: error.message || "Send request reset password failed",
      data: null,
    });
  }
};

module.exports = {
  registerAPI,
  loginAPI,
  refreshAccessTokenAPI,
  logoutAPI,
  fetchAccountAPI,
  verifyOTPAPI,
  forgotPasswordAPI,
  resetPasswordAPI,
};
