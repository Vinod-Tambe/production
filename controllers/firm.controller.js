const firmService = require("../services/firm.service");
const { createFirmSchema } = require("../validation/firm_validation");
const Firm = require('../models/firm.model');
const create_firm = async (req, res) => {
  try {
    // Validate input
    const { error } = createFirmSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { firm_phone_no, firm_email_id, firm_reg_no } = req.body;

    // Check if phone number, email, or registration number already exists
    const existingFirm = await Firm.findOne({
      $or: [
        { firm_phone_no },
        { firm_email_id },
        { firm_reg_no }
      ]
    });

    if (existingFirm) {
      if (existingFirm.firm_phone_no === firm_phone_no) {
        return res.status(409).json({
          success: false,
          message: "Phone Number already linked to another firm.",
        });
      }
      if (existingFirm.firm_email_id === firm_email_id) {
        return res.status(409).json({
          success: false,
          message: "Email Id already linked to another firm.",
        });
      }
      if (existingFirm.firm_reg_no === firm_reg_no) {
        return res.status(409).json({
          success: false,
          message: "Register No already linked to another firm.",
        });
      }
    }

    // Create new firm if no duplicates found
    const savedFirm = await firmService.create_firm(req.body);;

    return res.status(201).json({
      success: true,
      message: "Firm created successfully.",
      data: savedFirm,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to create firm: ${error.message}`,
    });
  }
};


// Update existing firm
const update_firm = async (req, res) => {
  try {
    const { id } = req.params;

    // Optional: validate req.body here with a separate update schema

    const updatedFirm = await firmService.update_firm(id, req.body);

    if (!updatedFirm) {
      return res.status(404).json({
        success: false,
        message: "Firm not found with the provided ID",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Firm updated successfully",
      data: updatedFirm,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to update firm: ${error.message}`,
    });
  }
};

// Get firm by ID
const get_firm_by_id = async (req, res) => {
  try {
    const { id } = req.params;
    const firm = await firmService.get_firm_by_id(id);

    if (!firm) {
      return res.status(404).json({
        success: false,
        message: "Firm not found with the provided ID",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Firm fetched successfully",
      data: firm,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch firm: ${error.message}`,
    });
  }
};

// Delete firm
const delete_firm = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFirm = await firmService.delete_firm(id);

    if (!deletedFirm) {
      return res.status(404).json({
        success: false,
        message: "Firm not found with the provided ID",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Firm deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to delete firm: ${error.message}`,
    });
  }
};

// Get all firms
const get_all_firm = async (req, res) => {
  try {
    const firms = await firmService.get_all_firm();
    return res.status(200).json({
      success: true,
      message: "Firms fetched successfully",
      data: firms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch firms: ${error.message}`,
    });
  }
};

module.exports = {
  create_firm,
  update_firm,
  get_firm_by_id,
  delete_firm,
  get_all_firm,
};
