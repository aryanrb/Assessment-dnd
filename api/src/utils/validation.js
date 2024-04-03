const Validator = require("validatorjs");

const validator = (body, rules, messages) => {
  const validation = new Validator(body, rules, messages);
  if (validation.fails(undefined)) {
    return { status: false, errors: validation.errors };
  }
  return { status: true };
};

module.exports = validator;
