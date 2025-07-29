const User = require('../models/user.model');

// =====================================
// 🧑 CREATE NEW USER
// =====================================
const create_user = async (userData) => {
    try {
  const {
    user_mobile = '',
    user_phone = '',
    user_email = '',
    user_first_name = '',
    user_middle_name = '',
    user_last_name = '',
    user_adhaar_no = '',
  } = userData;

  // Trim all fields for consistency
  const trimmedFirstName = user_first_name.trim();
  const trimmedLastName = user_last_name.trim();
  const trimmedMiddleName = user_middle_name.trim();
  const trimmedMobile = user_mobile.trim();
  const trimmedPhone = user_phone.trim();
  const trimmedEmail = user_email.trim();
  const trimmedAdhaar = user_adhaar_no.trim();

  // Check if a user with all these fields the same already exists
  const existingUser = await User.findOne({
    user_first_name: trimmedFirstName,
    user_mobile: trimmedMobile,
    user_phone: trimmedPhone,
    user_email: trimmedEmail,
    user_adhaar_no: trimmedAdhaar,
    user_middle_name: trimmedMiddleName,
    user_last_name: trimmedLastName,
  });
  if (existingUser) {
    throw new Error('User already exists — please change at least one: name, contact, or Aadhaar.');
  }

  // All validations passed, create user
  const user = new User(userData);
  const savedUser = await user.save();
    return { success: true, data: savedUser };
     } catch (err) {
    return { success: false, message: err.message };
  }
};

// =====================================
// ✏️ UPDATE USER BY ID
// =====================================
const update_user = async (userId, updatedData) => {
  try {
    // Destructure and trim the fields
    const {
      user_mobile = '',
      user_phone = '',
      user_email = '',
      user_first_name = '',
      user_middle_name = '',
      user_last_name = '',
      user_adhaar_no = '',
    } = updatedData;

    const trimmedFirstName = user_first_name.trim();
    const trimmedLastName = user_last_name.trim();
    const trimmedMiddleName = user_middle_name.trim();
    const trimmedMobile = user_mobile.trim();
    const trimmedPhone = user_phone.trim();
    const trimmedEmail = user_email.trim();
    const trimmedAdhaar = user_adhaar_no.trim();

    // Check if another user (not this one) has same data
    const duplicateUser = await User.findOne({
      _id: { $ne: userId }, // not the current user
      user_first_name: trimmedFirstName,
      user_middle_name: trimmedMiddleName,
      user_last_name: trimmedLastName,
      user_mobile: trimmedMobile,
      user_phone: trimmedPhone,
      user_email: trimmedEmail,
      user_adhaar_no: trimmedAdhaar,
    });

    if (duplicateUser) {
      throw new Error('Another user already exists with the same name, contact, or Aadhaar.');
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      throw new Error('User not found.');
    }

    return { success: true, data: updatedUser };
  } catch (err) {
    return { success: false, message: err.message };
  }
};


// =====================================
// ❌ DELETE USER BY ID
// =====================================
const delete_user = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

// =====================================
// 📋 GET ALL USERS
// =====================================
const get_all_user = async (filter = {}, projection = null, options = {}) => {
  return await User.find(filter, projection, options)
                   .sort({ user_add_date: -1 }); // descending by user_add_date
};

// =====================================
// 🔍 GET SINGLE USER BY ID
// =====================================
const get_user_details = async (userId) => {
  return await User.findById(userId);
};

module.exports = {
  create_user,
  update_user,
  delete_user,
  get_all_user,
  get_user_details
};
