const validator = require("../utils/validation");

const store = async (req, res, next) => {
  const valid = validator(req.body, {
    title: "required",
    description: "required",
    deadline: "required",
    assignTo: "required",
  });
  if (valid && !valid.status) {
    let [[err, errMsg]] = Object.entries(valid.errors.errors);
    res.json({ status: false, message: errMsg[0] });
  } else {
    next();
  }
};

module.exports = {
  store,
};
