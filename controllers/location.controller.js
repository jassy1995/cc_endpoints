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
  const {
    start = 0,
    phone,
    start_time,
    end_time,
    pageSize = page_size,
  } = req.body;
  if (!!phone && !!start_time && !!end_time) {
    const s_time = start_time?.split("T")[1];
    const e_time = end_time?.split("T")[1];
    const s_date = start_time?.split("T")[0];
    const e_date = end_time?.split("T")[0];

    const t1 = new Date(start_time);
    const t2 = new Date(end_time);
    console.log(s_time, e_time);
    console.log(s_date, e_date);
    console.log(t1, t2);
    // const parseDate1 = parseISO(start_time);
    // const parseDate2 = parseISO(end_time);
    let val = await Location.findAll({
      // where: {
      //   phone,
      //   time_created: {
      //     $between: [start_time, end_time],
      //   },
      // },
      where: {
        phone,

        // time_created: {
        //   [Op.and]: {
        //     [Op.gte]: t1,
        //     [Op.lte]: t2,
        //   },
        // },
        [Op.and]: [
          {
            createdAt: {
              // [Op.between]: [s_date, e_date],
              [Op.and]: {
                [Op.gte]: s_date,
                [Op.lte]: e_date,
              },
            },
          },
          Sequelize.where(
            Sequelize.cast(Sequelize.col("time_created"), "time"),
            ">=",
            `12:52:15`
          ),
          Sequelize.where(
            Sequelize.cast(Sequelize.col("time_created"), "time"),
            "<=",
            `17:03:00`
          ),
        ],
      },
      // offset: +start,
      // limit: pageSize,
    });
    return res.send(val);
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
