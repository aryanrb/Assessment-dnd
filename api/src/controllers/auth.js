const { respond } = require("../utils/response");
const { authRepository } = require("../repositories");
const { generateToken } = require("../utils/jwt");

const login = async (req, res) => {
  const { email, password } = req.body;
  const auth = await authRepository.login(email, password);
  if (!auth?.status) {
    return respond(res, 403, auth.message);
  }
  let user = auth.data;
  user.comparePassword(password, (err, match) => {
    if (!match || err) {
      return respond(res, 403, auth?.message || "Password does not match.");
    }
    let token = generateToken({ _id: user._id });

    return respond(res, 200, auth?.message || "User login successful.", {
      token,
      username: user.username,
      email: user.email,
      id: user._id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  });
};

const register = async (req, res) => {
  const { email, username, password } = req.body;
  const register = await authRepository.register(username, password, email);
  if (!register.status) {
    return respond(res, 403, register.message);
  }
  return respond(
    res,
    200,
    register.message || "User registered successfully.",
    register.data
  );
};

const all = async (req, res) => {
  const users = await authRepository.all();
  console.log(users, "===");
  if (!users.status) {
    return respond(res, 403, users.message);
  }
  return respond(
    res,
    200,
    users.message || "User fetched successfully.",
    users.data
  );
};

module.exports = {
  login,
  register,
  all,
};
