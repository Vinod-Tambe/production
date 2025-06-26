const User = require('../models/user.model');

// =====================================
// 🧑 CREATE NEW USER
// =====================================
const create_user = async (userData) => {
  const { user_mobile, user_phone, user_email, user_pre_id, user_post_id } = userData;

  // Check for duplicate user_mobile
  const existingMobile = await User.findOne({ user_mobile });
  if (existingMobile) {
    throw new Error('Mobile number already exists');
  }

  // Check for duplicate user_phone
  const existingPhone = await User.findOne({ user_phone });
  if (existingPhone) {
    throw new Error('Phone number already exists');
  }

  // Check for duplicate user_email
  const existingEmail = await User.findOne({ user_email });
  if (existingEmail) {
    throw new Error('Email already exists');
  }

  // Check if user_pre_id and user_post_id are the same
  if (user_pre_id === user_post_id) {
    throw new Error('Prefix ID and Postfix ID cannot be the same');
  }

  // All validations passed, create user
  const user = new User(userData);
  return await user.save();
};
// =====================================
// ✏️ UPDATE USER BY ID
// =====================================
const update_user = async (userId, updatedData) => {
  return await User.findByIdAndUpdate(userId, updatedData, {
    new: true,
    runValidators: true
  });
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
  return await User.find(filter, projection, options);
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
