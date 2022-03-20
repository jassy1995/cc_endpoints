require("dotenv").config();
const { MESSENGER_TOKEN, MESSENGER_BIRD_TOKEN } = process.env;
const axios = require("axios");

async function sendText(text, provider, channelId, phone) {
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
      message: text,
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
        text: text,
      },
    };
  } else if (provider == "messagebird") {
    url = "https://conversations.messagebird.com/v1/send";

    head = {
      Authorization: `AccessKey ${MESSENGER_BIRD_TOKEN}`,
    };
    body = {
      to: "+234" + phone.substr(-10).replace(" ", ""),
      from: channelId,
      type: "text",
      content: {
        text: text,
        disableUrlPreview: false,
      },
    };
  }

  let config = {
    method: "post",
    url: url,
    headers: head,
    data: body,
  };
  const result = await axios(config);
  return result;
}

module.exports = sendText;
