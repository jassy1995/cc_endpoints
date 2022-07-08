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
    // const s_time = start_time?.split("T")[1];
    // const e_time = end_time?.split("T")[1];
    // const s_date = start_time?.split("T")[0];
    // const e_date = end_time?.split("T")[0];

    // const t1 = new Date(start_time);
    // const t2 = new Date(end_time);
    // console.log(s_time, e_time);
    // console.log(s_date, e_date);
    // console.log(t1, t2);

    let endDate = req.body.end_time;
    let startDate = req.body.start_time;
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
    });

    // let val = await Location.findAll({
    //   where: {
    //     phone,
    //     [Op.and]: [
    //       {
    //         time_created: {
    //           [Op.and]: {
    //             [Op.lte]: "2022-07-05",
    //             [Op.gte]: "2022-07-01",
    //           },
    //         },
    //       },
    //       Sequelize.where(
    //         Sequelize.cast(Sequelize.col("time_created"), "time"),
    //         ">=",
    //         "13:52"
    //       ),
    //       Sequelize.where(
    //         Sequelize.cast(Sequelize.col("time_created"), "time"),
    //         "<=",
    //         "18:02"
    //       ),
    //     ],
    //   },
    // offset: +start,
    // limit: pageSize,
    // });
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
