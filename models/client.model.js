// const bcrypt = require("bcryptjs");

// const zlib = require("zlib");
const Client = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("client", {
    user_id: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    stage: {
      type: DataTypes.STRING,
    },
    qty: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.TEXT,
    },
    payment_key: {
      type: DataTypes.TEXT,
    },
    merchant_name: {
      type: DataTypes.TEXT,
    },
    account_no: {
      type: DataTypes.TEXT,
    },
    bank: {
      type: DataTypes.INTEGER,
    },
  });

module.exports = Client;
