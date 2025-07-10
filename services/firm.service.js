const Firm = require("../models/firm.model");

// Create new firm
const Firm = require("../models/firm");

const create_firm = async (firmData) => {
  try {
    // 1. Check required fields
    const requiredFields = [
      "firm_own_id",
      "firm_name",
      "firm_shop_name",
      "firm_reg_no",
      "firm_phone_no",
      "firm_email_id",
      "firm_owner"
    ];

    for (let field of requiredFields) {
      if (!firmData[field] || firmData[field].toString().trim() === "") {
        return { success: false, message: `${field} is required` };
      }
    }

    // 2. Check for duplicate firm_email_id
    const existingEmail = await Firm.findOne({ firm_email_id: firmData.firm_email_id });
    if (existingEmail) {
      return { success: false, message: `Email already exists: ${firmData.firm_email_id}` };
    }

    // 3. Check for duplicate firm_phone_no
    const existingPhone = await Firm.findOne({ firm_phone_no: firmData.firm_phone_no });
    if (existingPhone) {
      return { success: false, message: `Phone number already exists: ${firmData.firm_phone_no}` };
    }

    // 4. Check for duplicate firm_reg_no
    const existingRegNo = await Firm.findOne({ firm_reg_no: firmData.firm_reg_no });
    if (existingRegNo) {
      return { success: false, message: `Registration number already exists: ${firmData.firm_reg_no}` };
    }

    // 5. All checks passed, create and save firm
    const newFirm = new Firm(firmData);
    const savedFirm = await newFirm.save();

    return { success: true, data: savedFirm };
  } catch (err) {
    // Catch validation or other unexpected errors
    return { success: false, message: err.message };
  }
};


// Update existing firm
const update_firm = async (id, updateData) => {
  return await Firm.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

// Get firm by ID
const get_firm_by_id = async (id) => {
  return await Firm.findById(id);
};

// Delete firm
const delete_firm = async (id) => {
  return await Firm.findByIdAndDelete(id);
};

// Get all firms
const get_all_firm = async () => {
  return await Firm.find().sort({ firm_add_date: -1 });
};

module.exports = {
  create_firm,
  update_firm,
  get_firm_by_id,
  delete_firm,
  get_all_firm,
};
