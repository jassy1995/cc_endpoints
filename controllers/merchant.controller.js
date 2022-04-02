const query = require("../util/query");
const { verifyPhoneNumber } = require("nigerian-phone-number-validator");
const { productsButtons } = require("../util/interactive");
const { fetchUserOrder, generateAcctNo, verifyPayment } = require("../service");
const account = require("accounting");
const winston = require("../loggers");

exports.PayMerchant = async (req, res) => {
  const { phoneNumber, response, provider, channelId, phone } = req.body;
  const client = await query.getClient(phone);
  const { order } = await fetchUserOrder(phone);
  const isValidNumber = await verifyPhoneNumber(phone);

  if (isValidNumber) {
    if (
      response.toLowerCase() === "payment" ||
      response.toLowerCase() === "restart"
    ) {
      await query.deleteClient(phone);
      if (order?.length > 0) {
        let ordersValue = "";
        order.forEach((element, index) => {
          ordersValue += `*[${index + 1}]* *${element.merchant.name}*  \n
        Amount: *${account.formatMoney(element.amount, "₦")}* \n
        Des:  *${element.description}* \n
        Image:  *${element.picture}* \n
        `;
        });
        await query.createClient({
          phone,
          stage: 1,
          qty: order.length,
          orders: JSON.stringify(order),
        });
        return res.json({
          message: `Welcome 😃! This service allows to fulfil a payment to a merchant. \n we found the following order for you, select one to pay for below 👇 \n ${ordersValue}`,
        });
      } else {
        return res.json({
          message: "There are no request payment for this number",
        });
      }
    }

    if (client.stage === 1) {
      if (
        !isNaN(Number(response)) &&
        Number(response) > 0 &&
        Number(response) <= client.qty
      ) {
        await query.updateClient({ selected_order: response, stage: 2 }, phone);
        let message = await productsButtons(
          "kindly click on your preferred option 👇",
          [
            { id: "Make Payment", title: "Make Payment" },
            { id: "Decline", title: "Decline Payment" },
          ],
          provider
        );
        return res.json({
          message: message,
        });
      } else {
        let ordersValue = "";
        order.forEach((element, index) => {
          ordersValue += `*[${index + 1}]* *${element.merchant.name}*  \n
        Amount: *${account.formatMoney(element.amount, "₦")}* \n
        Des:  *${element.description}* \n
        Image:  *${element.picture}* \n
        `;
        });
        return res.json({
          message: `wrong Input, please enter the number that corresponds to the order you want to select below  👇\n  \n ${ordersValue}`,
        });
      }
    }

    if (client.stage === 2) {
      if (response === "Make Payment" && client.stage === 2) {
        const { merchant, amount, phone } = JSON.parse(client.orders)[
          client.selected_order - 1
        ];
        const body = {
          merchant_name: merchant.name,
          amount: amount,
          narration: "PES 2021",
          phone: phone,
        };
        const acct_detail = await generateAcctNo(body);
        await query.updateClient(
          {
            merchant_name: merchant.name,
            amount: acct_detail.data.amount,
            payment_key: acct_detail.data.order_ref,
            account_no: acct_detail.data.account_number,
            bank: acct_detail.data.bank_name,
            stage: 3,
          },
          phone
        );

        let message = await productsButtons(
          `Kindly make a payment of ${account.formatMoney(
            acct_detail.data.amount,
            "₦"
          )} to the account below 👇 \n *account No*  ${
            acct_detail.data.account_number
          } \n *bank*  ${
            acct_detail.data.bank_name
          } \n \n After payment, kindly click the button below to confirm your payment 👇 `,
          [{ id: "paid", title: "Confirm Payment" }],
          provider
        );
        return res.json({
          message: message,
        });
      } else if (response === "Decline" && client.stage === 2) {
        await query.deleteClient(phone);
        return res.json({
          message:
            "Your request has rejected successfully ❌. Enter *restart* to check for another order",
        });
      } else {
        return res.json({
          message: "Invalid Input,kindly provide the right one to proceed 👇",
        });
      }
    }
    if (client.stage === 3) {
      if (response === "paid") {
        const body = {
          merchant_name: client.merchant_name,
          amount: client.amount,
          narration: "PES 2021",
          transaction_reference: client.payment_key,
          // transaction_reference: "CC_kESfRVAdZyWc3qiTnmFxPYUBX8hK7tG4",
        };
        const verify = await verifyPayment(body);
        if (verify.status) {
          await query.deleteClient(phone);
          return res.json({
            message: `Thank you, your payment has been received 👍. Enter *restart* to make another payment`,
          });
        } else {
          let message = await productsButtons(
            `Sorry, we have not received your payment, kindly make a payment of ${account.formatMoney(
              client.amount,
              "₦"
            )} to the account below 👇 \n *account No*  ${
              client.account_no
            } \n *bank*  ${
              client.bank
            } \n \n After payment, click the button below to confirm your payment 👇 `,
            [{ id: "paid", title: "Confirm Payment" }],
            provider
          );
          return res.json({
            message: message,
          });
        }
      } else {
        return res.json({
          message: "Invalid Input,kindly provide the right one to proceed ",
        });
      }
    }
  } else {
    return res.json({
      message: "Invalid Number, kindly provide a valid number",
    });
  }
};
