const express = require("express");
let controller = require("../controllers/otp.controller");

const router = express.Router();

router.post("/generate-otp", controller.generateOtp);

module.exports = router;
