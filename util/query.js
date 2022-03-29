const { Pharmacy, PharmacyProcess } = require("../models");
class MyQuery {
  pendingRegistration = async (phone) => {
    return await PharmacyProcess.findOne({
      where: { phone_no: phone },
    });
  };

  existPharmacy = async (phone) => {
    return await Pharmacy.findOne({
      where: { phone_no: phone },
    });
  };

  isCompleted = async (phone) => {
    const complete = await this.PharmacyProcess(phone);
    if (
      complete.name &&
      complete.whatsapp_phone &&
      complete.address &&
      complete.location &&
      complete.image &&
      complete.bank_detail
    ) {
      return true;
    } else {
      return false;
    }
  };

  createPharmacy = async (data) => await Pharmacy.create(data);
  createPharmacyProcess = async (data) => await PharmacyProcess.create(data);
  pharmacyInfo = async (phone) => {
    return await PharmacyProcess.findOne({ where: { phone_no: phone } });
  };

  updatePharmacyProcess = async (data, phone) => {
    await PharmacyProcess.update(data, {
      where: {
        phone_no: phone,
      },
    });
  };

  // getAllExistCustomer = async (id) => {
  //   try {
  //     return await CustomerComplete.findAll({ where: { user_id: id } });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // getExistArtisan = async (id) => {
  //   try {
  //     return await ArtisanComplete.findOne({ where: { user_id: id } });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // saveCustomerRequest = async (data) => {
  //   try {
  //     await CustomerComplete.create(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // createArtisan = async (data) => {
  //   console.log(data);
  //   try {
  //     await ArtisanComplete.create(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // create = async (data) => {
  //   try {
  //     await Stage.create(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // update = async (data, id) => {
  //   try {
  //     await Stage.update(data, id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // updateArtisan = async (data, id) => {
  //   try {
  //     await ArtisanComplete.update(data, id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
}

module.exports = new MyQuery();
