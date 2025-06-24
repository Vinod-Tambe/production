const ownerService = require("../services/owner.service");
const jwtProvider = require("../config/jwtProvider");
const { validateOwner } = require("../validation/owner.validation");

// Create a new owner
const create_owner = async (req, res) => {
  try {
    const { error } = validateOwner(req.body);
    if (error) {
      return res.status(400).json({
        error: true,
        message: "Validation failed",
        details: error.details.map((err) => err.message),
      });
    }

    const owner_details = await ownerService.create_new_owner(req.body);
    const jwt = jwtProvider.generateToken(owner_details._id);

    return res.status(201).json({
      jwt,
      owner_details,
      error: false,
      message: "Owner created successfully.",
    });
  } catch (error) {
    console.error("Error creating owner:", error);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

// Update existing owner
const update_owner = async (req, res) => {
  try {
    const owner_id = req.params.id;

    if (req.body.own_password && req.body.own_confirm_password) {
      if (req.body.own_password !== req.body.own_confirm_password) {
        return res.status(400).json({
          error: true,
          message: "Password and confirm password must match.",
        });
      }
    }

    const updated_owner = await ownerService.update_owner_by_id(owner_id, req.body);

    return res.status(200).json({
      error: false,
      owner: updated_owner,
      message: "Owner updated successfully.",
    });
  } catch (error) {
    console.error("Error updating owner:", error);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

// Delete owner
const delete_owner = async (req, res) => {
  try {
    const owner_id = req.params.id;
    const result = await ownerService.delete_owner_by_id(owner_id);

    return res.status(200).json({
      error: false,
      message: result.message,
    });
  } catch (error) {
    console.error("Error deleting owner:", error);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

// Forgot password
const forgot_password = async (req, res) => {
  try {
    const { identifier, new_password, own_confirm_password } = req.body;

    if (!identifier || !new_password || !own_confirm_password) {
      return res.status(400).json({
        error: true,
        message: "identifier, new_password and own_confirm_password are required.",
      });
    }

    if (new_password !== own_confirm_password) {
      return res.status(400).json({
        error: true,
        message: "New password and confirm password must match.",
      });
    }

    const result = await ownerService.forgot_password(identifier, new_password);

    return res.status(200).json({
      error: false,
      message: result.message,
    });
  } catch (error) {
    console.error("Error in forgot password:", error);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

// ✅ Get owner by ID
const get_owner_by_id = async (req, res) => {
  try {
    const owner_id = req.params.id;
    const owner = await ownerService.get_owner_details_by_id(owner_id);

    return res.status(200).json({
      error: false,
      owner,
    });
  } catch (error) {
    console.error("Error getting owner by ID:", error);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

// ✅ Get all owners
const get_all_owners = async (req, res) => {
  try {
    const owners = await ownerService.get_all_owners();

    return res.status(200).json({
      error: false,
      owners,
    });
  } catch (error) {
    console.error("Error getting all owners:", error);
    return res.status(500).json({
      error: true,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  create_owner,
  update_owner,
  delete_owner,
  forgot_password,
  get_owner_by_id,
  get_all_owners,
};
