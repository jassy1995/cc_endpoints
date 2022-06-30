require("express-async-errors");
const express = require("express");
const cors = require("cors");
const otpRoute = require("../routes/otp.route");
const merchantRoute = require("../routes/merchant.route");
const kycRoute = require("../routes/kyc.route");
const LocationRoute = require("../routes/location.route");
const error = require("../middleware/error");
const helmet = require("helmet");
const compression = require("compression");

module.exports = function (app) {
  app.use(helmet());
  app.use(compression());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/api/v2", otpRoute);
  app.use("/api/v2", merchantRoute);
  app.use("/api/v2", kycRoute);
  app.use("/api/v2", LocationRoute);
  app.use(error);
};
