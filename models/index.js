const { Sequelize, DataTypes, Op, QueryTypes } = require("sequelize");
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

const Client = require("./client.model")(sequelize, DataTypes, Sequelize);
const Kyc = require("./kyc.model")(sequelize, DataTypes, Sequelize);
const Location = require("./location.model")(sequelize, DataTypes, Sequelize);

module.exports = {
  Client,
  Kyc,
  Location,
  sequelize,
  Sequelize,
  QueryTypes,
  Op,
  DataTypes,
};
