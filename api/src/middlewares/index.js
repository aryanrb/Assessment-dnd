const { User } = require("../models");
const user = require("../models/user");
const jwt = require("../utils/jwt");

const isAuthenticated = async (req, res, next) => {
  if (!req.headers.authorization) {
    // throw new Error("User Not Authenticated");
    console.log("User Not Authenticated");
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  const { status: valid, data } = jwt.isValidToken(token);

  if (!valid) {
    // throw new Error("User Not Authenticated");
    console.log("User Not Authenticated");
    return;
  }

  if (data?.id) {
    const isUserDeleted = await User.findOne({
      where: {
        id: data?.id,
        isDeleted: false,
      },
      raw: true,
    });

    if (!isUserDeleted) throw new Error("User Not Authorized");
  }

  req.user = data;
  next();
};

const isGuest = async (req, res, next) => {
  if (req.headers.authorization) {
    throw new Error("User Not Guest");
  }
  next();
};

module.exports = {
  isAuthenticated,
  isGuest,
};
