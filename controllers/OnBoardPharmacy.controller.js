const { Pharmacy, PharmacyProcess } = require("../models");
const query = require("../util/query");
const { questions } = require("../util/others");
const { verifyPhoneNumber } = require("nigerian-phone-number-validator");

exports.RegisterPharmacy = async (req, res) => {
  const { phoneNumber, response, provider, channelId, phone } = req.body;
  const pending = await query.pendingRegistration(phone);
  const isExist = await query.existPharmacy(phone);
  const info = await query.pharmacyInfo(phone);
  // const validatePhone = (phone) => await verifyPhoneNumber(phone);

  //   {
  //     "phoneNumber":"+2347035280592",
  //     "response":"renew",
  //     "provider":"messagebird",
  //      "channelId":"d599d756-7e5c-4514-8cdf-04ab47955b1e"
  //      "phone" : "07035280592"
  // }
  if (
    response.toLowerCase() === "register" ||
    response.toLowerCase() === "restart"
  ) {
    await query.createPharmacyProcess({ phone_no: phone, stage: 1, step: 0 });
    return res.json({
      message: `Hello welcome to the registration center, kindly ${questions[0].q}`,
    });
  }
  if (info.stage === 1 && info.step === 0) {
    await query.updatePharmacyProcess(
      { name: response, step: info.step + 1 },
      phone
    );
    return res.json({
      message: `kindly ${questions[1].q}`,
    });
  }
  if (info.stage === 1 && info.step === 1) {
    let validateNumber = await verifyPhoneNumber(phone);
    if (isExist?.whatsapp_phone === response) {
      return res.json({
        message: `your whatsapp number is already taken,kindly enter another number`,
      });
    }

    if (validateNumber) {
      await query.updatePharmacyProcess(
        { whatsapp_phone: response, step: info.step + 1 },
        phone
      );
      return res.json({
        message: `kindly ${questions[2].q}`,
      });
    } else if (!validateNumber) {
      return res.json({
        message: `Invalid phone number, kindly enter a valid phone number`,
      });
    } else {
      return res.json({
        message: `Invalid input, kindly enter the requested value`,
      });
    }
  }
  if (info.stage === 1 && info.step === 2) {
    await query.updatePharmacyProcess(
      { address: response, step: info.step + 1 },
      phone
    );
    return res.json({
      message: `kindly ${questions[3].q}`,
    });
  }
  if (info.stage === 1 && info.step === 3) {
    await query.updatePharmacyProcess(
      { location: response, step: info.step + 1 },
      phone
    );
    return res.json({
      message: `kindly ${questions[4].q[0]}`,
    });
  }
  if (info.stage === 1 && info.step === 4) {
    let attendants = [];
    let attendant = { name: response };
    attendants.push(attendant);
    console.log(attendants);
    console.log(attendant);

    await query.updatePharmacyProcess(
      {
        attendant: JSON.stringify(attendants),
        step: info.step + 1,
        attendantIndex: 0,
      },
      phone
    );
    return res.json({
      message: `kindly ${questions[4].q[1]}`,
    });
  }
  if (info.stage === 1 && info.step === 5) {
    let attendant_phone = { whatsapp_phone: response };
    let attendant = JSON.parse(info.attendant)[info.attendantIndex];
    let attendants = JSON.parse(info.attendant);
    let insert_phone = { ...attendant, ...attendant_phone };
    let pushUpdated = attendants.push(insert_phone);
    console.log(insert_phone);
    console.log(pushUpdated);
    await query.updatePharmacyProcess(
      {
        attendant: JSON.stringify(pushUpdated),
        step: info.step + 1,
        attendantIndex: info.attendantIndex + 1,
      },
      phone
    );
    return res.json({
      message: `kindly ${questions[5].q}`,
    });
  }
  if (info.stage === 1 && info.step === 6) {
    await query.updatePharmacyProcess(
      {
        image: response,
        step: info.step + 1,
      },
      phone
    );
    return res.json({
      message: `kindly ${questions[6].q}`,
    });
  }
  if (info.stage === 1 && info.step === 7) {
    await query.updatePharmacyProcess(
      {
        bank_detail: response,
        step: info.step + 1,
      },
      phone
    );
    return res.json({
      message: `your registration is successful,kindly enter *restart* for a new  registration`,
    });
  }
};
