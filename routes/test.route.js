const express = require("express");
let controller = require("../controllers/test.controller");

const router = express.Router();

router.post("/test", controller.TestFunction);

module.exports = router;
