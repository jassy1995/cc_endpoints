const express = require("express");
let controller = require("../controllers/kyc.controller");

const router = express.Router();

router.post("/create-kyc", controller.createKyc);
router.get("/kyc/:id", controller.getKycById);

module.exports = router;
