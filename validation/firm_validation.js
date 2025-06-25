const Firm = require("../models/firm.model");
const { validateFirm } = require("../validators/firm.validator");

// Create new firm
const create_firm = async (req, res) => {
  try {
    const { error } = validateFirm(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map((err) => err.message),
      });
    }

    const newFirm = new Firm(req.body);
    const savedFirm = await newFirm.save();

    res.status(201).json({ success: true, data: savedFirm });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update existing firm
const update_firm = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = validateFirm(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map((err) => err.message),
      });
    }

    const updatedFirm = await Firm.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedFirm) {
      return res.status(404).json({ success: false, message: "Firm not found" });
    }

    res.json({ success: true, data: updatedFirm });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get firm by ID
const get_firm_by_id = async (req, res) => {
  try {
    const { id } = req.params;
    const firm = await Firm.findById(id);

    if (!firm) {
      return res.status(404).json({ success: false, message: "Firm not found" });
    }

    res.json({ success: true, data: firm });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete firm
const delete_firm = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFirm = await Firm.findByIdAndDelete(id);

    if (!deletedFirm) {
      return res.status(404).json({ success: false, message: "Firm not found" });
    }

    res.json({ success: true, message: "Firm deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all firms
const get_all_firm = async (req, res) => {
  try {
    const firms = await Firm.find().sort({ createdAt: -1 });
    res.json({ success: true, data: firms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  create_firm,
  update_firm,
  get_firm_by_id,
  delete_firm,
  get_all_firm,
};
