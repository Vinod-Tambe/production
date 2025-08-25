const firmService = require("../services/firm.service");
const { createFirmSchema, updateFirmSchema } = require("../validation/firm_validation");
const { getOwnerIdFromToken } = require("../utils/tokenHelper");
const { add_new_image, delete_image } = require("../services/image.service");
const { saveFiles } = require("../services/file.service");
const create_firm = async (req, res) => {
  try {
    const ownerId = await getOwnerIdFromToken(req);

    // Validate request body using Joi schema
    const { error } = createFirmSchema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: error.details.map((err) => err.message).join(", "),
      });
    }

    req.body.firm_own_id = ownerId;

    // Prepare image data if logos/QR provided
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
    if (req.body.firm_own_sign) {
      imageData.firm_own_sign = {
        img_own_id: ownerId,
        img_name: req.body.firm_own_sign,
      };
    }
    // console.log(imageData);
    // Insert image references (if any)
    const insertedImages = await add_new_image(imageData);

    // Attach new image IDs to req.body for file saving
    req.body = {
      ...req.body,
      ...insertedImages,
    };
    //  console.log(insertedImages);
    // Create firm
    const savedFirm = await firmService.create_firm(req.body);
    if (!savedFirm.success) {
      return res.status(400).json({
        success: false,
        message: savedFirm.message,
      });
    }
    // Save uploaded image files (if present)
    if (req.files) {
      if (req.files.left_logo_file) {
        await saveFiles(req.files.left_logo_file, ownerId, insertedImages.firm_left_logo_id);
      }
      if (req.files.right_logo_file) {
        await saveFiles(req.files.right_logo_file, ownerId, insertedImages.firm_right_logo_id);
      }
      if (req.files.qr_code_file) {
        await saveFiles(req.files.qr_code_file, ownerId, insertedImages.firm_qr_code_id);
      }
      if (req.files.firm_own_sign_file) {
        await saveFiles(req.files.firm_own_sign_file, ownerId, insertedImages.firm_own_sign);
      }
    }
    return res.status(200).json({
      success: true,
      message: "Firm created successfully.",
      data: savedFirm.data,
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
    const ownerId = await getOwnerIdFromToken(req);

    // Validate request body using Joi schema
    const { error } = updateFirmSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((err) => err.message).join(", "),
      });
    }
    const orignalData = await firmService.get_firm_by_id(id);
    // Prepare image data if logos/QR provided
    const imageData = {};
    if (req.body.firm_left_logo_id) {
      imageData.firm_left_logo_id = {
        img_own_id: ownerId,
        img_name: req.body.firm_left_logo_id,
      };
      if (orignalData.firm_left_logo_id != '' && orignalData.firm_left_logo_id != null) {
        delete_image(orignalData.firm_left_logo_id, ownerId);
      }
    }
    if (req.body.firm_right_logo_id) {
      imageData.firm_right_logo_id = {
        img_own_id: ownerId,
        img_name: req.body.firm_right_logo_id,
      };
      if (orignalData.firm_right_logo_id != '' && orignalData.firm_right_logo_id != null) {
        delete_image(orignalData.firm_right_logo_id, ownerId);
      }
    }
    if (req.body.firm_qr_code_id) {
      imageData.firm_qr_code_id = {
        img_own_id: ownerId,
        img_name: req.body.firm_qr_code_id,
      };
      if (orignalData.firm_qr_code_id != '' && orignalData.firm_qr_code_id != null) {
        delete_image(orignalData.firm_qr_code_id, ownerId);
      }
    }
    if (req.body.firm_own_sign) {
      imageData.firm_own_sign = {
        img_own_id: ownerId,
        img_name: req.body.firm_own_sign,
      };
      if (orignalData.firm_own_sign != '' && orignalData.firm_own_sign != null) {
        delete_image(orignalData.firm_own_sign, ownerId);
      }
    }

    // Insert image references (if any)
    const insertedImages = await add_new_image(imageData);

    // Attach new image IDs to req.body for file saving
    req.body = {
      ...req.body,
      ...insertedImages,
    };

    // Update firm
    const updatedFirm = await firmService.update_firm(id, req.body);
    if (!updatedFirm) {
      return res.status(404).json({
        success: false,
        message: "Firm not found with the provided ID",
      });
    }
    // Save uploaded image files (if present)
    if (req.files) {
      if (req.files.left_logo_file) {
        await saveFiles(req.files.left_logo_file, ownerId, insertedImages.firm_left_logo_id);
      }
      if (req.files.right_logo_file) {
        await saveFiles(req.files.right_logo_file, ownerId, insertedImages.firm_right_logo_id);
      }
      if (req.files.qr_code_file) {
        await saveFiles(req.files.qr_code_file, ownerId, insertedImages.firm_qr_code_id);
      }
      if (req.files.firm_own_sign_file) {
        await saveFiles(req.files.firm_own_sign_file, ownerId, insertedImages.firm_own_sign);
      }
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
    // Use req.query instead of req.body for GET requests
    const firms = await firmService.get_all_firm(req.query);
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