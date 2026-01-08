const express = require("express");
const router = express.Router();
const taskRoute = require("./tasks.route");

router.use("/tasks", taskRoute);

module.exports = router;