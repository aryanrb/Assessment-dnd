const { User } = require("../models");

const login = async (email) => {
  let user = await User.findOne({ email });
  if (!user) {
    return {
      status: false,
      message: "User not found.",
    };
  }

  return {
    status: true,
    data: user,
  };
};

const register = async (username, password, email) => {
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return { status: false, message: "Email already in use." };
    }

    const user = await new User({
      email,
      username,
      password,
    });

    await user.save();
    return {
      status: true,
      message: "User registration successful.",
      data: user,
    };
  } catch (error) {
    return { status: false, message: "Error creating new user." };
  }
};

const all = async () => {
  try {
    const users = await User.find({ isDeleted: false }).select("_id username");
    return {
      status: true,
      code: 200,
      message: "Users fetched successfully.",
      data: users,
    };
  } catch (error) {
    return { status: false, code: 400, message: "Error fetching users." };
  }
};

module.exports = {
  login,
  register,
  all,
};
