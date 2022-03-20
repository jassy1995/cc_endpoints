require("dotenv").config();
// const api_keys = process.env.API_KEY;
const { MESSENGER_TOKEN, api_keys } = process.env;
const axios = require("axios");
const winston = require("../loggers");

const validateNumber = require("../validator/otp/otp-validator");

function sendText(phoneNumber, provider, channelId, phone) {
  if (provider === "web") return;

  let url;
  let head;
  let body;

  if (provider == "web") {
    url = "https://bnpl-chatbot-server.herokuapp.com/direct";

    head = {
      Authorization: `Bearer ${MESSENGER_TOKEN}`,
    };
    body = {
      phone: "234" + phone.substr(-10).replace(" ", ""),
      message: "please wait while generating your otp",
    };
  } else if (provider == "messengerpeople") {
    url = "https://api.messengerpeople.dev/messages";

    head = {
      Authorization: `Bearer ${MESSENGER_TOKEN}`,
    };
    body = {
      recipient: "234" + phone.substr(-10).replace(" ", ""),
      sender: channelId,
      payload: {
        type: "text",
        text: "please wait while generating your otp",
      },
    };
  } else if (provider == "messagebird") {
    url = "https://conversations.messagebird.com/v1/send";

    head = {
      Authorization: `${MESSENGEBIRD_TOKEN}`,
    };
    body = {
      to: "+234" + phone.substr(-10).replace(" ", ""),
      from: channelId,
      type: "text",
      content: {
        text: "please wait while generating your otp",
        disableUrlPreview: false,
      },
    };
  }

  return new Promise((resolve) => {
    axios
      .post(url, body, { headers: head })
      .then(async (response) => {
        resolve(response.data);
      })
      .catch((err) => {
        return "error";
      });
  });
}

exports.generateOtp = async (req, res, next) => {
  const { error, value } = validateNumber(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { phoneNumber, provider, channelId, phone } = req.body;
  sendText(phoneNumber, provider, channelId, phone);
  let config = {
    method: "post",
    url: "https://mobile.creditclan.com/api/v3/lender/generate/otp",
    headers: {
      "X-API-KEY": api_keys,
      "Content-Type": "application/json",
    },
    data: { phone: phone },
  };
  let response = await axios(config);
  winston.info(response.data.message);
  return res.json({ message: response.data.message });
};
