const KYC = (sequelize, DataTypes, Sequelize) =>
  sequelize.define("kyc", {
    full_name: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.INTEGER,
    },
    gender: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.TEXT,
    },
    phone: {
      type: DataTypes.TEXT,
    },
    residential_address: {
      type: DataTypes.TEXT,
    },
    profile_picture: {
      type: DataTypes.TEXT,
    },
    bvn: {
      type: DataTypes.TEXT,
    },
    nin: {
      type: DataTypes.TEXT,
    },
  });

module.exports = KYC;
