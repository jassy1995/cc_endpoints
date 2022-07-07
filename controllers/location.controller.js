const { Location, Sequelize } = require("../models");
const validate1 = require("../validator/location/location");
const validate2 = require("../validator/location/location2");
const pageSize = 4;

exports.createLocation = async (req, res) => {
  const { error, value } = validate1(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { phone, latlng, time_created } = req.body;
  const result = await Location.create({ phone, latlng, time_created });
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
  const { error, value } = validate2(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { phone, time_created } = req.body;
  const result = await Location.findOne({ where: { phone, time_created } });
  if (!result) {
    return res.send({
      message: "no data match, please try again",
      data: null,
    });
  } else {
    return res.send({ message: "fetched successfully", data: result });
  }
};

exports.filterLocation = async (req, res) => {
  const {
    start = 0,
    phone = null,
    starting_time = null,
    end_time = null,
  } = req.body;
  if (!!phone && !!starting_time && !!end_time) {
    console.log("first");
    let val = await Location.findAll({
      where: {
        phone,
        time_created: {
          $between: [starting_time, end_time],
        },
      },
      group: "phone",
      attributes: [
        ["phone", "phone"],
        [Sequelize.fn("COUNT", "phone"), "count"],
      ],
      order: [[Sequelize.literal("count"), "DESC"]],
      raw: true,
      offset: +start,
      limit: pageSize,
    });
    return res.send(val);
  } else {
    console.log("enter second");
    let val = await Location.findAll({
      group: "phone",
      attributes: ["phone", [Sequelize.fn("COUNT", "phone"), "count"]],
      order: [[Sequelize.literal("count"), "DESC"]],
      raw: true,
      offset: +start,
      limit: pageSize,
    });
    return res.send(val);
  }
};
