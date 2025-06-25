const mongoose = require("mongoose");
const Owner = require("../models/owner.model");
const bcrypt = require("bcrypt");

// ✅ Create a new owner
const create_new_owner = async (owner_data) => {
  try {
    const isOwnerExist = await Owner.findOne({
      own_mobile_no: owner_data.own_mobile_no,
    });

    if (isOwnerExist) {
      throw new Error(
        "Owner already exists with mobile no: " + owner_data.own_mobile_no
      );
    }

    const hashedPassword = await bcrypt.hash(owner_data.own_password, 8);

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
      own_salt_index_key: owner_data.own_salt_index_key,
    });

    return owner_details;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ✅ Update owner by ID
const update_owner_by_id = async (owner_id, updated_data) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(owner_id)) {
      throw new Error("Invalid owner ID format.");
    }

    if (updated_data.own_password) {
      updated_data.own_password = await bcrypt.hash(updated_data.own_password, 8);
    }

    const updated_owner = await Owner.findByIdAndUpdate(
      owner_id,
      updated_data,
      { new: true, runValidators: true }
    );

    if (!updated_owner) {
      throw new Error("Owner not found with ID: " + owner_id);
    }

    return updated_owner;
  } catch (error) {
    throw new Error(error.message);
  }
};

// ✅ Delete owner by ID
const delete_owner_by_id = async (owner_id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(owner_id)) {
      throw new Error("Invalid owner ID format.");
    }

    const deleted_owner = await Owner.findByIdAndDelete(owner_id);

    if (!deleted_owner) {
      throw new Error("Owner not found with ID: " + owner_id);
    }

    return { message: "Owner deleted successfully." };
  } catch (error) {
    throw new Error(error.message);
  }
};

// ✅ Forgot password by mobile number or login ID
const forgot_password = async (identifier, new_password) => {
  try {
    const owner = await Owner.findOne({
      $or: [
        { own_mobile_no: identifier },
        { own_login_id: identifier }
      ]
    });

    if (!owner) {
      throw new Error("Owner not found with mobile number or login ID: " + identifier);
    }

    const hashedPassword = await bcrypt.hash(new_password, 8);
    owner.own_password = hashedPassword;
    await owner.save();

    return { message: "Password reset successfully." };
  } catch (error) {
    throw new Error(error.message);
  }
};

// ✅ Get owner details by ID (updated and validated)
const get_owner_details_by_id = async (owner_id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(owner_id)) {
      throw new Error("Invalid owner ID format.");
    }

    const owner = await Owner.findById(owner_id);

    if (!owner) {
      throw new Error("Owner not found with ID: " + owner_id);
    }

    return owner;
  } catch (error) {
    throw new Error("Error fetching owner: " + error.message);
  }
};

// ✅ Get all owners
const get_all_owners = async () => {
  try {
    const owners = await Owner.find().sort({ createdAt: -1 });
    return owners;
  } catch (error) {
    throw new Error("Failed to fetch owners: " + error.message);
  }
};

module.exports = {
  create_new_owner,
  update_owner_by_id,
  delete_owner_by_id,
  forgot_password,
  get_owner_details_by_id,
  get_all_owners
};
