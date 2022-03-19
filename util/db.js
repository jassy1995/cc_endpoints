const { sequelize } = require("../models");
const winston = require("../loggers");

module.exports = function () {
  sequelize.sync().then(() => {
    winston.info("Drop and re-sync db.");
  });
};
