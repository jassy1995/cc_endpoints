const { Client } = require("../models");
class MyQuery {
  getClient = async (phone) => {
    return await Client.findOne({
      where: { phone: phone },
    });
  };

  createClient = async (data) => await Client.create(data);
  deleteClient = async (phone) => {
    await Client.destroy({ where: { phone: phone } });
  };

  updateClient = async (data, phone) => {
    await Client.update(data, {
      where: {
        phone: phone,
      },
    });
  };
}

module.exports = new MyQuery();
