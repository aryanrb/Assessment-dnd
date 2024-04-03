const express = require("express");
const middlewares = require("../middlewares");
const { taskController, authController } = require("../controllers");
const { taskValidation } = require("../validations");
const router = express.Router();

router.use(middlewares.isAuthenticated);

router.get("/users", authController.all);

router.get("/tasks", taskController.all);
router.get("/task/:taskId", taskController.single);
router.get("/tasks/:userId", taskController.singleUser);

router.post("/task", [taskValidation.store], taskController.store);

router.put("/task/:id", taskController.update);
router.put("/task/status/:id", taskController.updateStatus);

router.delete("/task/:id", taskController.destroy);

module.exports = router;
