const firmService = require("../services/firm.service");

// Create new firm
const create_firm = async (req, res) => {
  try {
    const savedFirm = await firmService.create_firm(req.body);
    res.status(201).json({
      success: true,
      message: "Firm created successfully",
      data: savedFirm,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to create firm: ${error.message}`,
    });
  }
};

// Update existing firm
const update_firm = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFirm = await firmService.update_firm(id, req.body);

    if (!updatedFirm) {
      return res.status(404).json({
        success: false,
        message: "Firm not found with the provided ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Firm updated successfully",
      data: updatedFirm,
    });
  } catch (error) {
    res.status(400).json({
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

    res.status(200).json({
      success: true,
      message: "Firm fetched successfully",
      data: firm,
    });
  } catch (error) {
    res.status(400).json({
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

    res.status(200).json({
      success: true,
      message: "Firm deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to delete firm: ${error.message}`,
    });
  }
};

// Get all firms
const get_all_firm = async (req, res) => {
  try {
    const firms = await firmService.get_all_firm();
    res.status(200).json({
      success: true,
      message: "Firms fetched successfully",
      data: firms,
    });
  } catch (error) {
    res.status(500).json({
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
