const { Location, Sequelize, Op, QueryTypes, sequelize } = require("../models");
const validate1 = require("../validator/location/location");
const validate2 = require("../validator/location/location2");
const page_size = 10;

exports.createLocation = async (req, res) => {
  const { error, value } = validate1(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const { phone, latlng } = req.body;
  // const time = 2022 - 07 - 01 13: 36: 24.735748
  const time_created = new Date(Date.now()).toLocaleString("sv");
  const time = time_created?.split(" ")[1].slice(0, 5);
  const result = await Location.create({ phone, latlng, time_created, time });
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
    // select * from locations where (time_created between '2000-01-01 09:00:00' and '2050:01:01 12:00:00') and phone = '08179264890'
    const endDate = req.body.end_time;
    const startDate = req.body.start_time;
    const list = await Location.findAll({
      where: {
        phone,
        time: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      offset: +start,
      limit: pageSize,
    });
    return res.send(list);
  } else {
    let val = await Location.findAll({
      group: "phone",
      attributes: [
        "phone",
        [Sequelize.fn("COUNT", "phone"), "count"],
        "latlng",
        "time_created",
      ],
      order: [
        ["createdAt", "DESC"],
        [Sequelize.literal("count"), "DESC"],
      ],
      raw: true,
      offset: +start,
      limit: pageSize,
    });

    const result = await Promise.all(
      val.map((x) => {
        return Location.findOne({
          where: { phone: x.phone },
          order: [["createdAt", "DESC"]],
        });
      })
    );
    return res.send(result);
  }
};

exports.getLastVisited = async (req, res) => {
  const result = await sequelize.query(
    "select distinct(phone) from locations where HOUR(TIMEDIFF(now(), time_created)) > 24 order by id desc",
    {
      type: QueryTypes.SELECT,
    }
  );

  // let val = await Location.findAll({
  //   group: "phone",
  //   attributes: [
  //     "phone",
  //     [Sequelize.fn("COUNT", "phone"), "count"],
  //     "latlng",
  //     "time_created",
  //   ],
  //   order: [
  //     ["createdAt", "DESC"],
  //     [Sequelize.literal("count"), "DESC"],
  //   ],
  //   raw: true,
  // });
  // const twentyFourHrInMs = 24 * 60 * 60 * 1000;
  // const twentyFourHoursAgo = Date.now() - twentyFourHrInMs;
  // const result = await Promise.all(
  //   val.map((x) => {
  //     return Location.findOne({
  //       where: {
  //         phone: x.phone,
  //         createdAt: {
  // [Op.gt]: Sequelize.literal("NOW() - INTERVAL '24 HOURS'"),
  // [Op.gt]: new Date(Date.now() - 24 * 60 * 60 * 1000),
  //         },
  //       },
  //       order: [["createdAt", "DESC"]],
  //     });
  //   })
  // );

  // select MAX(createdAt),phone from location where createdAt <  DATE_SUB(column, INTERVAL 24 HOUR) group by phone
  // const lastRecord = await Location.findOne({
  //   where: { phone: req.body.phone },
  //   order: [["createdAt", "DESC"]],
  // });

  // const lastVisitedRecords = await Location.findOne({
  //   where: { phone: req.body.phone, createdAt: { [Op.gt]: 24 } },
  // });
  // if (dateRmain > 24) {
  // }
  //  where:{productId:pid},
  //   attributes:[[sequelize.fn('max', sequelize.col('rating')),'max']]
  // const twentyFourHrInMs = 24 * 60 * 60 * 1000;
  // const twentyFourHoursAgo = Date.now() - twentyFourHrInMs;
  // const allUser = await Location.findAll();
  // const post = await Post.find({ userId: currentUser._id });
  // where: { [Op.and]: [{ createdAt: 5 }, { createdAt: 6 }] },
  // const result = await Promise.all(
  //   allUser.map((x) => {
  //     const ts = Location.findAll({
  //       where: { id: x.id },
  //       attributes: [[Sequelize.fn("max", sequelize.col("createdAt")), "max"]],

  //     });

  //     return ts;
  //   })
  // );

  return res.send(result);
};

exports.phones = async (req, res) => {
  const result = await Location.findAll({
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("phone")), "phoneNumber"],
    ],
  });
  return res.send(result);
};
