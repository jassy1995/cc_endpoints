const { Pharmacy, PharmacyProcess } = require("../models");
const query = require("../util/query");
const { questions } = require("../util/others");
const { verifyPhoneNumber } = require("nigerian-phone-number-validator");
const { productsButtons } = require("../util/interactive");
const { fetchUserOrder } = require("../service");

exports.PayMerchant = async (req, res) => {
  const { phoneNumber, response, provider, channelId, phone } = req.body;
  const client = await query.getClient(phone);
  const order = await query.getOrder(phone);

  const fetchOrder = await fetchUserOrder(phone);
  console.log(fetchOrder);

  // return response.json({ data: fetchOrder });

  //   let message = await productsButtons(
  //     "would you like to add attendant?",
  //     [
  //       { id: "add attendant", title: "add attendant" },
  //       { id: "skip", title: "skip" },
  //     ],
  //     provider
  //   );
  //   return res.json({
  //     message: message,
  //   });
  // }
};
