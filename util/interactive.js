const productsButtons = (info, button, provider) => {
  let final_button = [];

  button.forEach((element) => {
    let btn;
    if (provider == "messengerpeople" || provider == "web") {
      btn = { type: "reply", reply: element };
    } else if (provider == "messagebird") {
      btn = { id: element.id, title: element.title, type: "reply" };
    }
    final_button.push(btn);
  });

  let message = {
    payload: {
      type: "interactive",
      interactive: {
        type: "button",
        body: {
          text: info,
        },
        action: {
          buttons: final_button,
        },
      },
    },
  };
  return message;
};

module.exports = {
  productsButtons,
};
