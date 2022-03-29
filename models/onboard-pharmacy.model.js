// const bcrypt = require("bcryptjs");

// const zlib = require("zlib");
const OnBoardHospital = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("pharmacy", {
    hospital_name: {
      type: DataTypes.STRING,
    },
    phone_no: {
      type: DataTypes.STRING,
    },
    Address: {
      type: DataTypes.STRING,
    },
    ownByCompany: {
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
    stage: {
      type: DataTypes.INTEGER,
    },
    step: {
      type: DataTypes.INTEGER,
    },
  });

module.exports = OnBoardHospital;
