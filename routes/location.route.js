const express = require("express");
let controller = require("../controllers/location.controller");

const router = express.Router();

router.post("/create-location", controller.createLocation);
router.post("/retrieve-location", controller.retrieveLocation);
router.post("/filter", controller.filterLocation);
router.get("/last-visited", controller.getLastVisited);
router.get("/phone", controller.phones);

module.exports = router;
