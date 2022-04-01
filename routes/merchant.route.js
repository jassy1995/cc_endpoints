const express = require("express");
let controller = require("../controllers/merchant.controller");

const router = express.Router();

router.post("/pay-merchant", controller.PayMerchant);

module.exports = router;
