const Location = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("location", {
    phone: {
      type: DataTypes.STRING,
    },
    latlng: {
      type: DataTypes.TEXT,
    },
    time: {
      type: DataTypes.TIME,
    },
    time_created: {
      type: DataTypes.TEXT,
    },
  });

module.exports = Location;
