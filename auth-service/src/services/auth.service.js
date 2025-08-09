const jwt = require("jsonwebtoken");
const axios = require("axios");
const emailUntil = require("../utils/email.util");
const Auth = require("../models/auth");
const { v4: uuidv4 } = require("uuid");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};
const register = async (userData) => {
  try {
    const url = process.env.USER_SERVICE_URL;
    const newUserResponse = await axios.post(url, userData);
    const newUser = newUserResponse.data;

    if (!newUser.status) {
      return {
        status: false,
        EC: -1,
        message: newUser.message,
        data: null,
      };
    }

    const data = { user_id: newUser.data._id };
    await Auth.create(data);

    const emailResult = await emailUntil.sendWelcomeEmail(
      newUser.data.email,
      newUser.data.name
    );
    if (!emailResult.status) {
      console.error("Error sending welcome email:", emailResult.message);
    }
    return {
      status: true,
      EC: 0,
      data: newUser.data,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message,
      data: null,
    };
  }
};
const login = async (email, password) => {
  try {
    const passCheckUrl = `${process.env.USER_SERVICE_URL}/check-password`;
    const data = { email, password };
    const checkPassResponse = await axios.post(passCheckUrl, data);

    const dataRes = checkPassResponse.data;
    if (!dataRes.status) {
      return {
        status: false,
        EC: -1,
        message: "ERROR login",
        data: null,
      };
    }

    const access_token = generateToken(dataRes.data._id);
    const refresh_token = generateRefreshToken(dataRes.data._id);

    await Auth.findOneAndUpdate(
      { user_id: dataRes.data._id },
      {
        $set: {
          refresh_token: refresh_token,
          created_at: new Date(),
          expire: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      },
      { upsert: true, new: true }
    );

    return {
      status: true,
      EC: 0,
      message: "Login successfully!",
      data: {
        user: dataRes.data,
        refresh_token: refresh_token,
        access_token: access_token,
      },
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Login failed",
      data: null,
    };
  }
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const url = `${process.env.USER_SERVICE_URL}/id/${decoded.id}`;
    const userRes = await axios.get(url);
    const user = userRes.data.data;
    if (!user) {
      return {
        status: false,
        EC: -1,
        message: "Refresh token not found",
        data: null,
      };
    }

    const newAccessToken = generateToken(user._id);

    return {
      status: true,
      EC: 0,
      message: "Create new accessToken successfully!",
      data: {
        access_token: newAccessToken,
      },
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Create new accessToken failed",
      data: null,
    };
  }
};

const logout = async (id) => {
  try {
    await Auth.findOneAndUpdate(
      { user_id: id },
      {
        $set: {
          refresh_token: null,
          expire: null,
        },
      }
    );
    return {
      status: true,
      EC: 0,
      message: "Log out successfully!",
      data: {
        userID: id,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "Log out failed",
      data: null,
    };
  }
};

const fetchAccount = async (id) => {
  try {
    const user = await Auth.findOne({ user_id: id });
    return {
      status: true,
      EC: 0,
      message: "Fetch account successfully!",
      data: user,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "Fetch account failed",
      data: null,
    };
  }
};

const forgotPassword = async (email) => {
  try {
    const url = `${process.env.USER_SERVICE_URL}/email/${email}`;
    const dataRes = await axios.get(url);
    const user = dataRes.data.data;
    if (!user) {
      return {
        status: false,
        EC: 1,
        message: "User not found",
        data: null,
      };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Auth.findOneAndUpdate(
      { user_id: user._id },
      { $set: { otp: otp, otp_expire: new Date(Date.now() + 10 * 60 * 1000) } }
    );

    const emailResult = await emailUntil.sendResetPasswordEmail(
      user.email,
      user.name,
      otp
    );

    if (!emailResult) {
      return {
        status: false,
        EC: 1,
        message: "Error sending email",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Verify OTP has sent to your email",
      data: null,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "Send email failed",
      data: null,
    };
  }
};

const verifyOTP = async (email, otp) => {
  try {
    const url = `${process.env.USER_SERVICE_URL}/email/${email}`;
    const dataRes = await axios.get(url);

    const user = dataRes.data.data;
    if (!user) {
      return {
        status: false,
        EC: 1,
        message: "User not found",
        data: null,
      };
    }

    const authRes = await Auth.findOne({ user_id: user._id });
    if (!authRes) {
      return {
        status: false,
        EC: 1,
        message: "Auth id of user not found",
        data: null,
      };
    }

    if (
      !authRes.otp ||
      !authRes.otp_expire ||
      authRes.otp !== otp ||
      authRes.otp_expire < Date.now()
    ) {
      return {
        status: false,
        EC: 1,
        message: "Invalid OTP or expired",
        data: null,
      };
    }
    const verify_token = uuidv4();
    authRes.verify_token = verify_token;
    await authRes.save();
    return {
      status: true,
      EC: 0,
      message: "Verify OTP successfully",
      data: {
        verify_token: authRes.verify_token,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "Verify OTP failed",
      data: null,
    };
  }
};

const resetPassword = async (email, newPassword, verify_token) => {
  try {
    const authRes = await Auth.findOne({ verify_token: verify_token });
    if (!authRes) {
      return {
        status: false,
        EC: 1,
        message: "Unauthorized",
        data: null,
      };
    }
    const url = `${process.env.USER_SERVICE_URL}/update-password`;
    const data = { email, newPassword };
    const dataRes = await axios.post(url, data);

    const isSuccess = dataRes.data.status;

    if (!isSuccess) {
      return {
        status: false,
        EC: 1,
        message: dataRes.data.message,
        data: null,
      };
    }
    authRes.otp = undefined;
    authRes.otp_expire = undefined;
    authRes.verify_token = undefined;
    await authRes.save();

    return {
      status: true,
      EC: 0,
      message: "Reset password successfully!",
      data: null,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "Error from server to reset password",
      data: null,
    };
  }
};
const checkPermission = async (verify_token) => {
  try {
    const authRes = await Auth.findOne({ verify_token: verify_token });
    if (!authRes) {
      return {
        status: false,
        EC: 1,
        message: "Unauthorized or expired token",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Authorized",
      data: null,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "ERROR FROM SERVER!",
      data: null,
    };
  }
};
module.exports = {
  register,
  login,
  refreshAccessToken,
  logout,
  forgotPassword,
  fetchAccount,
  verifyOTP,
  resetPassword,
  checkPermission,
};
