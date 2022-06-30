const { Location } = require("../models");

exports.createLocation = async (req, res) => {
  const { phone, latIng, time_created } = req.body;
  const result = await Location.create({ phone, latIng, time_created });
  if (!result) {
    return res.send({
      message: "unable to save, please try again",
      data: null,
    });
  } else {
    return res.send({ message: "created successfully", data: result });
  }
};

exports.retrieveLocation = async (req, res) => {
  const { phone, time_created } = req.body;
  const result = await Location.findOne({ where: { phone, time_created } });
  if (!result) {
    return res.send({
      message: "unable to retrieve data, please try again",
      data: null,
    });
  } else {
    return res.send({ message: "fetched successfully", data: result });
  }
};
