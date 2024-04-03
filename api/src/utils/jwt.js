const jwt = require("jsonwebtoken");
const { JWT } = require("../config");

const generateToken = (data) => {
  return jwt.sign(data, JWT.SECRET, {
    expiresIn: JWT.TOKEN_EXPIRY,
  });
};

const isValidToken = (token) => {
  try {
    const data = jwt.verify(token, JWT.SECRET);
    return {
      status: true,
      data,
    };
  } catch (e) {
    return {
      status: false,
      data: null,
    };
  }
};

module.exports = { generateToken, isValidToken };
