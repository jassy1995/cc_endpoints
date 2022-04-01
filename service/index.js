const axios = require("axios");

const getUserOrder = async (phone) => {
  return await axios.post(
    "https://sellbackend.creditclan.com/parent/index.php/globalrequest/get_payment__order",
    { phone: phone }
  );
};

module.exports = { getUserOrder };
