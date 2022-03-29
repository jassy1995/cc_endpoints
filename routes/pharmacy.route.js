const express = require("express");
let controller = require("../controllers/OnBoardPharmacy.controller");

const router = express.Router();

router.post("/register-pharmacy", controller.RegisterPharmacy);

module.exports = router;
