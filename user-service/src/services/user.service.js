const User = require("../models/user");
const bcrypt = require("bcrypt");

const createUser = async (user) => {
  try {
    const existedUser = await User.findOne({ email: user.email });
    if (existedUser) {
      return {
        status: false,
        EC: 1,
        message: "Email already exists",
        data: null,
      };
    }

    const newUser = new User({ ...user, is_active: true });
    await newUser.save();

    const createdUser = await User.findById(newUser._id).select("-password");
    return {
      status: true,
      EC: 0,
      message: "Created user successfully!",
      data: createdUser,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Create user failed",
      data: null,
    };
  }
};

const getAllUser = async () => {
  try {
    const listUser = await User.find({}).select("-password");
    return {
      status: true,
      EC: 0,
      message: "Fetched user list successfully!",
      data: listUser,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Get all users failed",
      data: null,
    };
  }
};

const getAUser = async (id) => {
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return {
        status: false,
        EC: 1,
        message: "User not found",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Fetched user successfully!",
      data: user,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Get user failed",
      data: null,
    };
  }
};
const getAUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        status: false,
        EC: 1,
        message: "User not found",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Get user successfully!",
      data: user,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: 1,
      message: error.message || "Get user failed",
      data: null,
    };
  }
};

const updateUser = async (user) => {
  try {
    const { id, ...updateData } = user;
    let result = await User.updateOne({ _id: id }, updateData);
    if (!result) {
      return {
        status: false,
        EC: 1,
        message: "User not found",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Updated user successfully!",
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Update user failed",
      data: null,
    };
  }
};
const deleteUser = async (id) => {
  try {
    const result = await User.deleteById(id);
    if (!result) {
      return {
        status: false,
        EC: 1,
        message: "User not found",
        data: null,
      };
    }
    return {
      status: true,
      EC: 0,
      message: "Deleted user successfully!",
      data: result,
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Delete user failed",
      data: null,
    };
  }
};

const isPasswordMatch = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        status: false,
        EC: 1,
        message: "User not found",
        data: null,
      };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return {
        status: false,
        EC: 2,
        message: "Invalid password",
        data: null,
      };
    }

    return {
      status: true,
      EC: 0,
      message: "Password match",
      data: {
        _id: user._id,
        email: user.email,
        role: user.role,
        phone: user.phone,
        type: user.type,
      },
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Password verification failed",
      data: null,
    };
  }
};
const updatePassword = async (email, newPassword) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        status: false,
        EC: 1,
        message: "User not found in system",
        data: null,
      };
    }
    user.password = newPassword;
    await user.save();
    return {
      status: true,
      EC: 0,
      message: "Update password successfully!",
      data: user._id,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      EC: -1,
      message: error.message || "Update password failed (ERROR SERVER)",
      data: null,
    };
  }
};

const getUserWithPagination = async ({ page, limit, search }) => {
  try {
    const skip = (page - 1) * limit;

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      User.find(query).select("-password").skip(skip).limit(limit),
      User.countDocuments(query),
    ]);

    return {
      status: true,
      EC: 0,
      message: "Fetched users with pagination",
      data: {
        users,
        total,
        page,
        limit,
      },
    };
  } catch (error) {
    return {
      status: false,
      EC: -1,
      message: error.message || "Failed to paginate users",
      data: null,
    };
  }
};

module.exports = {
  createUser,
  getAllUser,
  getAUser,
  updateUser,
  deleteUser,
  isPasswordMatch,
  getAUserByEmail,
  updatePassword,
  getUserWithPagination,
};
