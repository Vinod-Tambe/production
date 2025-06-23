const Owner = require("../models/owner.model");
const bcrypt = require("bcrypt");

const create_new_owner = async (owner_data) => {
  try {
    // Check if owner already exists by mobile number
    const isOwnerExist = await Owner.findOne({
      own_mobile_no: owner_data.own_mobile_no,
    });

    if (isOwnerExist) {
      throw new Error(
        "Owner already exists with mobile no: " + owner_data.own_mobile_no
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(owner_data.own_password, 8);

    // Create new owner
    const owner_details = await Owner.create({
      own_fname: owner_data.own_fname,
      own_mname: owner_data.own_mname,
      own_lname: owner_data.own_lname,
      own_mobile_no: owner_data.own_mobile_no,
      own_phone_no: owner_data.own_phone_no,
      own_city: owner_data.own_city,
      own_state: owner_data.own_state,
      own_country: owner_data.own_country,
      own_village: owner_data.own_village,
      own_address: owner_data.own_address,
      own_login_id: owner_data.own_login_id,
      own_password: hashedPassword,
      own_payment_gateway: owner_data.own_payment_gateway,
      own_merchant_id: owner_data.own_merchant_id,
      own_salt_key: owner_data.own_salt_key,
      own_salt_index_key: owner_data.own_salt_index_key
    });

    return owner_details;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  create_new_owner
};
