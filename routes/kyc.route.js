const express = require("express");
let controller = require("../controllers/kyc.controller");

const router = express.Router();

router.post("/create-kyc", controller.createKyc);
router.get("/kyc/:id", controller.getKycById);
router.post("/kyc/update", controller.updateKyc);
router.post("/kyc/complete/:id", controller.completeKyc);
router.post("/kyc/completed-kyc-record", controller.completeKyc);

module.exports = router;
