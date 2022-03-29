// const bcrypt = require("bcryptjs");

// const zlib = require("zlib");
const OnBoardPharmacyProcess = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("onboard-pharmacy-process", {
    name: {
      type: DataTypes.STRING,
    },
    phone_no: {
      type: DataTypes.STRING,
    },
    whatsapp_phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.TEXT,
    },
    bank_detail: {
      type: DataTypes.TEXT,
    },
    attendant: {
      type: DataTypes.TEXT,
    },
    attendantIndex: {
      type: DataTypes.INTEGER,
    },
    stage: {
      type: DataTypes.INTEGER,
    },
    step: {
      type: DataTypes.INTEGER,
    },
  });

module.exports = OnBoardPharmacyProcess;
