const {  cr_accounts, dr_accounts } = require("../data/account.data");
const Firm = require("../models/firm.model");
const { create_multiple_account } = require("./account.service");

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
    await create_default_account(savedFirm.firm_own_id,savedFirm.firm_id,savedFirm.firm_start_date);
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

const get_all_firm = async (fields) => {
  fields=fields.field;
  if (!Array.isArray(fields) || fields.length === 0) {
    return await Firm.find().sort({ firm_add_date: -1 });
  }

  const selectFields = fields.join(' ');

  return await Firm.find()
    .select(selectFields)
    .sort({ firm_add_date: -1 });
};

const create_default_account=async(acc_own_id,acc_firm_id,acc_opening_date)=>{
 // Using the new formatted objects
const cr_account_requests = cr_accounts.map(acc => ({
  acc_name: acc.acc_name,
  acc_pre_acc: acc.acc_pre_acc,
  acc_balance_type: "CR",
  acc_opening_date,
  acc_own_id,
  acc_firm_id
}));

const dr_account_requests = dr_accounts.map(acc => ({
  acc_name: acc.acc_name,
  acc_pre_acc: acc.acc_pre_acc,
  acc_balance_type: "DR",
  acc_opening_date,
  acc_own_id,
  acc_firm_id
}));
const all_account_requests = [...cr_account_requests, ...dr_account_requests];
create_multiple_account(all_account_requests);

}

module.exports = {
  create_firm,
  update_firm,
  get_firm_by_id,
  delete_firm,
  get_all_firm,
};
