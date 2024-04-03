const validator = require("../utils/validation");

const login = async (req, res, next) => {
  const valid = validator(req.body, {
    email: "required|email",
    password: "required|string|min:8|max:24",
  });
  if (valid && !valid.status) {
    let [[err, errMsg]] = Object.entries(valid.errors.errors);
    res.json({ status: false, message: errMsg[0] });
  } else {
    next();
  }
};

const register = async (req, res, next) => {
  const valid = validator(req.body, {
    username: "required",
    email: "required|email",
    password: "required|string|min:8|max:24",
  });
  if (valid && !valid.status) {
    let [[err, errMsg]] = Object.entries(valid.errors.errors);
    res.json({ status: false, message: errMsg[0] });
  } else {
    next();
  }
};

module.exports = {
  login,
  register,
};
