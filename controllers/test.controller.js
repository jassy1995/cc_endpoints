const { Employee } = require("../models");

exports.TestFunction = async (req, res) => {
  const employee = await Employee.create({
    name: "John",
    email: "john@example.com",
  });

  return res.status(200).json({
    message: "Employee created",
    data: employee,
  });
};
