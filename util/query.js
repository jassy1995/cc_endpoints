const { Client, Order } = require("../models");
class MyQuery {
  getClient = async (phone) => {
    return await Client.findOne({
      where: { phone: phone },
    });
  };

  getOrder = async (phone) => {
    return await Order.findAll({
      where: { phone: phone },
    });
  };

  createClient = async (data) => await Client.create(data);

  createOrder = async (data) => await Order.create(data);

  updateClient = async (data, phone) => {
    await Client.update(data, {
      where: {
        phone: phone,
      },
    });
  };

  updateOrder = async (data, phone) => {
    await Order.update(data, {
      where: {
        phone: phone,
      },
    });
  };
}

module.exports = new MyQuery();
