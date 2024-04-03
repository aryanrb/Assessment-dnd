const express = require("express");
const guestRoutes = require("./guest");
const authenticatedRoutes = require("./authenticated");

const router = express.Router();

router.use("/v1", guestRoutes);
router.use("/v1", authenticatedRoutes);

module.exports = router;
