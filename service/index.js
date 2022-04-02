const axios = require("axios");

const fetchUserOrder = async (phone) => {
  return (
    await axios.post(
      "https://sellbackend.creditclan.com/parent/index.php/globalrequest/get_payment__order",
      { phone: phone }
    )
  ).data;
};

const generateAcctNo = async (payload) => {
  return (
    await axios.post("https://wema.creditclan.com/generate/account", payload)
  ).data;
};

const verifyPayment = async (payload) => {
  return (
    await axios.post(
      "https://wema.creditclan.com/api/v3/wema/verify_transaction",
      payload
    )
  ).data;
};

module.exports = { fetchUserOrder, generateAcctNo, verifyPayment };

//  {
//        merchant_name: getUser[0].merchant_name,
//        amount: getUser[0].amount,
//        narration: "PES 2021",
//        // transaction_reference: getUser[0].payment_key,
//        transaction_reference: "CC_kESfRVAdZyWc3qiTnmFxPYUBX8hK7tG4",
//      }

// const result = await axios.post(
//   "https://wema.creditclan.com/generate/account",
//   {
//     merchant_name: getUserInfo[0]?.merchant_name,
//     amount: getUserInfo[0]?.amount,
//     narration: "PES 2021",
//     phone: phoneNumber,
//   }
// );
