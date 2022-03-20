require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const winston = require("../loggers");
const sendText = require("../util/messages/direct-message");
const validateNumber = require("../validator/otp/otp-validator");

exports.generateOtp = async (req, res, next) => {
  const { error, value } = validateNumber(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { provider, channelId, phone } = req.body;
  await sendText(
    "please wait while generating your otp",
    provider,
    channelId,
    phone
  );

  let config = {
    method: "post",
    url: "https://mobile.creditclan.com/api/v3/lender/generate/otp",
    headers: {
      "X-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
    data: { phone: phone },
  };
  let response = await axios(config);
  winston.info(response.data.message);
  return res.json({ message: response.data.message });
};
