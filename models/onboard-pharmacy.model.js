// const bcrypt = require("bcryptjs");

// const zlib = require("zlib");
const OnBoardPharmacy = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("pharmacy", {
    name: {
      type: DataTypes.STRING,
    },
    phone_no: {
      type: DataTypes.STRING,
    },
    whatsapp_phone: {
      type: DataTypes.STRING,
    },
    Address: {
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
    stage: {
      type: DataTypes.INTEGER,
    },
    step: {
      type: DataTypes.INTEGER,
    },
  });

module.exports = OnBoardPharmacy;
