const { Kyc } = require("../models");
const validateKyc = require("../validator/kyc/kyc-validator");

exports.createKyc = async (req, res) => {
  const result = await Kyc.create({
    phone: req.body.phone,
    full_name: "",
    email: "",
    gender: "",
    residential_address: "",
    profile_picture: "",
    dob: "",
    bvn: "",
    nin: "",
    signature: "",
    completed: 0,
    stage: 0,
    step: 0,
  });
  return res.send({ message: "created successfully", result });
};

exports.updateKyc = async (req, res) => {
  const { phone, ...others } = req.body;
  await Kyc.update(others, { where: { phone } });
  const result = Kyc.findOne({ where: { phone } });
  if (
    result.full_name &&
    result.dob &&
    result.email &&
    result.gender &&
    result.residential_address &&
    result.nin &&
    result.bvn &&
    result.phone
  ) {
    await Kyc.update({ completed: 1 }, { where: { phone } });
    const result2 = Kyc.findOne({ where: { phone } });
    return res.send({ message: "updated successfully", result: result2 });
  } else {
    return res.send({ message: "updated successfully", result: result });
  }
};

exports.completeKyc = async (req, res) => {
  await Kyc.update({ completed: -1 }, { where: { id: req.params.id } });
  return res.send({ message: "done" });
};

exports.getAllKyc = async (req, res) => {
  const results = await Kyc.findAll({
    order: [["createdAt", "DESC"]],
    where: { completed: 1 },
    offset: Number(req.body.start),
    limit: 20,
  });

  return res.send({ message: "success", data: results });
};

exports.getKycById = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: "id is required" });
  }
  const result = await Kyc.findByPk(req.params.id);
  return res.send({ message: "fetched successfully", result });
};
