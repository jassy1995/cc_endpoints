const { Pharmacy } = require("../models");

exports.RegisterPharmacy = async (req, res) => {
  const { phoneNumber, response, provider, channelId, phone } = req.body;
  //   {
  //     "phoneNumber":"+2347035280592",
  //     "response":"renew",
  //     "provider":"messagebird",
  //      "channelId":"d599d756-7e5c-4514-8cdf-04ab47955b1e"
  //      "phone" : "07035280592"
  // }
  const pharmacy = await Pharmacy.create({
    name: req.body.name,
    email: req.body.email,
  });

  return res.status(200).json({
    message: "pharmacy created work",
  });
};
