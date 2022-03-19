const productionLogger = require("./productionLogger");
const developmentLogger = require("./developmentLogger");
require("dotenv").config();

let logger = null;
const { NODE_ENV } = process.env;
if (NODE_ENV === "production") {
  logger = productionLogger();
} else {
  logger = developmentLogger();
}

module.exports = logger;
