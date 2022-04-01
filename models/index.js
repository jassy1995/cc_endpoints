const { Sequelize, DataTypes, Op } = require("sequelize");
const dbConfig = require("../config/db.config");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  logging: false,

  pool: {
    ...dbConfig.pool,
  },
});

const Order = require("./order.model")(sequelize, DataTypes, Sequelize);
const Client = require("./client.model")(sequelize, DataTypes, Sequelize);

module.exports = {
  Order,
  Client,
  sequelize,
  Sequelize,
  Op,
  DataTypes,
};
