const Client = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("client", {
    phone: {
      type: DataTypes.STRING,
    },
    stage: {
      type: DataTypes.INTEGER,
    },
    qty: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.TEXT,
    },
    orders: {
      type: DataTypes.TEXT,
    },
    selected_order: {
      type: DataTypes.INTEGER,
    },
  });

module.exports = Client;
