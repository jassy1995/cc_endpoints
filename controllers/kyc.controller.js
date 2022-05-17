const { Kyc } = require("../models");
const validateKyc = require("../validator/kyc/kyc-validator");

exports.createKyc = async (req, res) => {
  const { error, value } = validateKyc(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const result = await Kyc.create(req.body);
  return res.send({ message: "created successfully", result });
};

exports.getKycById = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "id is required" });
  }
  const result = await Kyc.findByPk(req.params.id);
  return res.send({ message: "fetched successfully", result });
};
