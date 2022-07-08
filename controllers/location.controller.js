const { Location, Sequelize, Op } = require("../models");
const validate1 = require("../validator/location/location");
const validate2 = require("../validator/location/location2");
const page_size = 10;

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
  const { start, phone, start_time, end_time, pageSize = page_size } = req.body;
  if (!!phone && !!start_time && !!end_time) {
    let endDate = req.body.end_time;
    let startDate = req.body.start_time;
    let liveDate = Date.now();
    console.log(liveDate);
    const list = await Location.findAll({
      where: {
        phone,
        createdAt: {
          [Op.gt]: new Date(startDate),
          [Op.lt]: new Date(
            new Date(endDate).getTime() + 60 * 60 * 24 * 1000 - 1
          ),
        },
      },
      offset: +start,
      limit: pageSize,
    });
    return res.send(list);
  } else {
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

exports.phones = async (req, res) => {
  const result = await Location.findAll({
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("phone")), "phoneNumber"],
    ],
  });
  return res.send(result);
};
