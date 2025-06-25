const Firm = require("../models/firm.model");

// Create new firm
const create_firm = async (firmData) => {
  const newFirm = new Firm(firmData);
  return await newFirm.save();
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
