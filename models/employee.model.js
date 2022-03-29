const bcrypt = require("bcryptjs");
const zlib = require("zlib");
const Employee = (sequelize, DataTypes, Sequelize) =>
  sequelize.define(
    "employee",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.TEXT,
        validate: {
          isEmail: true,
          is: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        },
      },
    },
    { timestamps: false }
  );

module.exports = Employee;
