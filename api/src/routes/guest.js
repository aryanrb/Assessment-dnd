const express = require("express");
const middlewares = require("../middlewares");
const { authValidation } = require("../validations");
const { authController } = require("../controllers");
const router = express.Router();

router.post(
  "/login",
  [middlewares.isGuest, authValidation.login],
  authController.login
);
router.post(
  "/register",
  [middlewares.isGuest, authValidation.register],
  authController.register
);

module.exports = router;
