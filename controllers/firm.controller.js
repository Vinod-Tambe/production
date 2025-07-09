const firmService = require("../services/firm.service");
const { createFirmSchema } = require("../validation/firm_validation");
const { getOwnerIdFromToken } = require("../utils/tokenHelper");
const { add_new_image } = require("../services/image.service");
const { saveFiles } = require("../services/file.service");  // Import the new service

const create_firm = async (req, res) => {
  try {
    const ownerId = await getOwnerIdFromToken(req);

    // Validate input
    const { error } = createFirmSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    req.body.firm_own_id = ownerId;
    const imageData = {};

    if (req.body.firm_left_logo_id) {
      imageData.firm_left_logo_id = {
        img_own_id: ownerId,
        img_name: req.body.firm_left_logo_id,
      };
    }

    if (req.body.firm_right_logo_id) {
      imageData.firm_right_logo_id = {
        img_own_id: ownerId,
        img_name: req.body.firm_right_logo_id,
      };
    }

    if (req.body.firm_qr_code_id) {
      imageData.firm_qr_code_id = {
        img_own_id: ownerId,
        img_name: req.body.firm_qr_code_id,
      };
    }
    // Create the firm first
    const savedFirm = await firmService.create_firm(req.body);

    // Directory to save uploaded images
    const insertedImages = await add_new_image(imageData,);
    req.body = {
      ...req.body,
      ...insertedImages,
    };
    // Save files with the new service and get filenames
    const upload_right_logo_file= await saveFiles(req.files.right_logo_file,ownerId, insertedImages.firm_right_logo_id);
    const upload_left_logo_file= await saveFiles(req.files.right_logo_file,ownerId, insertedImages.firm_left_logo_id);
    const upload_qr_code_file= await saveFiles(req.files.right_logo_file,ownerId, insertedImages.firm_qr_code_id);

    // Optionally save file names to the firm record or do other logic here

    return res.status(200).json({
      success: true,
      message: "Firm created successfully."
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
      return res.status(200).json({
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
    return res.status(200).json({
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
      return res.status(200).json({
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
    return res.status(200).json({
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
    return res.status(200).json({
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
    return res.status(200).json({
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
