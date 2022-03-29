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

const Employee = require("./employee.model")(sequelize, DataTypes, Sequelize);
const Pharmacy = require("./onboard-pharmacy.model")(
  sequelize,
  DataTypes,
  Sequelize
);

module.exports = {
  Employee,
  Pharmacy,
  sequelize,
  Sequelize,
  Op,
  DataTypes,
};
