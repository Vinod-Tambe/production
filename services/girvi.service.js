const Girvi = require('../models/girvi.model'); 

// Add a new Girvi
const create_girvi_record=async(girviData)=> {
  try {
    const girvi = new Girvi(girviData);
    const savedGirvi = await girvi.save();
    return await savedGirvi.populate([
      'girv_firm_id',
      'girv_own_id',
      'girv_user_id',
      'girv_staff_id',
      'girv_first_int_cr_acc_id',
      'girv_first_int_dr_acc_id',
      'girv_cash_acc_id',
      'girv_bank_acc_id',
      'girv_online_acc_id',
      'girv_card_acc_id',
      'girv_dr_acc_id'
    ]);
  } catch (error) {
    throw new Error(`Failed to add Girvi: ${error.message}`);
  }
}

// Update an existing Girvi by ID
const update_girvi_record=async(id, updateData)=> {
  try {
    const girvi = await Girvi.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!girvi) {
      throw new Error('Girvi not found');
    }
    return await girvi.populate([
      'girv_firm_id',
      'girv_own_id',
      'girv_user_id',
      'girv_staff_id',
      'girv_first_int_cr_acc_id',
      'girv_first_int_dr_acc_id',
      'girv_cash_acc_id',
      'girv_bank_acc_id',
      'girv_online_acc_id',
      'girv_card_acc_id',
      'girv_dr_acc_id'
    ]);
  } catch (error) {
    throw new Error(`Failed to update Girvi: ${error.message}`);
  }
}

// Remove a Girvi by ID
const remove_girvi_record=async(id)=> {
  try {
    const girvi = await Girvi.findByIdAndDelete(id);
    if (!girvi) {
      throw new Error('Girvi not found');
    }
    return { message: 'Girvi removed successfully' };
  } catch (error) {
    throw new Error(`Failed to remove Girvi: ${error.message}`);
  }
}

// Get a Girvi by ID
const get_girvi_record_details= async(id)=> {
  try {
    const girvi = await Girvi.findById(id).populate([
      'girv_firm_id',
      'girv_own_id',
      'girv_user_id',
      'girv_staff_id',
      'girv_first_int_cr_acc_id',
      'girv_first_int_dr_acc_id',
      'girv_cash_acc_id',
      'girv_bank_acc_id',
      'girv_online_acc_id',
      'girv_card_acc_id',
      'girv_dr_acc_id'
    ]);
    if (!girvi) {
      throw new Error('Girvi not found');
    }
    return girvi;
  } catch (error) {
    throw new Error(`Failed to get Girvi: ${error.message}`);
  }
}

// List all Girvi records
const get_all_girvi_record=async()=> {
  try {
    return await Girvi.find().populate([
      'girv_firm_id',
      'girv_own_id',
      'girv_user_id',
      'girv_staff_id',
      'girv_first_int_cr_acc_id',
      'girv_first_int_dr_acc_id',
      'girv_cash_acc_id',
      'girv_bank_acc_id',
      'girv_online_acc_id',
      'girv_card_acc_id',
      'girv_dr_acc_id'
    ]);
  } catch (error) {
    throw new Error(`Failed to list all Girvi: ${error.message}`);
  }
}

module.exports = {
  create_girvi_record,
  update_girvi_record,
  remove_girvi_record,
  get_girvi_record_details,
  get_all_girvi_record
};