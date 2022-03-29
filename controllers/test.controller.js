const { Employee } = require("../models");

exports.TestFunction = async (req, res) => {
  const employee = await Employee.create({
    name: req.body.name,
    email: req.body.email,
  });

  return res.status(200).json({
    message: "Employee created",
    data: employee,
  });
};
