const Admin = require('../models/admin.model');
const bcrypt = require('bcrypt');

// ============================
// 🔍 Get Admin by Query (ID, Email, Phone)
// ============================
const get_admin_details = async (query) => {
  try {
    const admin = await Admin.findOne(query).select('-admin_password');
    if (!admin) {
      throw new Error('Admin not found with given query.');
    }

    return {
      success: true,
      message: 'Admin details retrieved successfully.',
      data: admin,
    };
  } catch (error) {
    throw new Error(`Failed to get admin details: ${error.message}`);
  }
};

// ============================
// ✏️ Update Admin by ID
// ============================
const update_admin_details = async (adminId, updateData) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-admin_password');

    if (!updatedAdmin) {
      throw new Error('Admin not found or update failed.');
    }

    return {
      success: true,
      message: 'Admin details updated successfully.',
      data: updatedAdmin,
    };
  } catch (error) {
    throw new Error(`Failed to update admin: ${error.message}`);
  }
};

// ============================
// ➕ Create New Admin
// ============================
const create_admin = async (adminData) => {
  try {
    // Check if email or phone already exists
    const existing = await Admin.findOne({
      $or: [
        { admin_email: adminData.admin_email },
        { admin_phone: adminData.admin_phone }
      ]
    });

    if (existing) {
      throw new Error('Admin with same email or phone already exists.');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    adminData.admin_password = await bcrypt.hash(adminData.admin_password, salt);

    // Create new admin
    const newAdmin = new Admin(adminData);
    await newAdmin.save();

    // Return full admin data (with hashed password)
    return {
      success: true,
      message: 'Admin created successfully.',
      data: newAdmin.toObject(), // includes hashed password
    };
  } catch (error) {
    throw new Error(`Failed to create admin: ${error.message}`);
  }
};


module.exports = {
  get_admin_details,
  update_admin_details,
  create_admin,
};
