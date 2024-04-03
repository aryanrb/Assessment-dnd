const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid("production", "development").required(),
    PORT: Joi.number().default(8080),
    JWT_SECRET: Joi.string().required(),
    TOKEN_EXPIRY: Joi.number().default(300000),
    DB_URI: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
};
module.exports.JWT = {
  SECRET: envVars.JWT_SECRET,
  TOKEN_EXPIRY: envVars.TOKEN_EXPIRY,
};
module.exports.DB = {
  URI: envVars.DB_URI,
};
