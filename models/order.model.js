// const bcrypt = require("bcryptjs");

// const zlib = require("zlib");
const Order = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("order", {
    merchant_id: {
      type: DataTypes.STRING,
    },
    customer_id: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    picture: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.TEXT,
    },
    updated_at: {
      type: DataTypes.TEXT,
    },
    updated_at: {
      type: DataTypes.TEXT,
    },
    updated_at: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.TEXT,
    },
    merchant: {
      type: DataTypes.TEXT,
    },
  });

module.exports = Order;
