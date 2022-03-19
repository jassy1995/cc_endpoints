require("dotenv").config();
const api_keys = process.env.API_KEY;
const axios = require("axios");
const winston = require("../loggers");

const validateNumber = require("../validator/otp/otp-validator");

exports.generateOtp = async (req, res, next) => {
  const { error, value } = validateNumber(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let config = {
    method: "post",
    url: "https://mobile.creditclan.com/api/v3/lender/generate/otp",
    headers: {
      "X-API-KEY": api_keys,
      "Content-Type": "application/json",
    },
    data: { phone: req.body.phone },
  };
  let response = await axios(config);
  winston.info(response.data.message);
  return res.json({ message: response.data.message });
};
