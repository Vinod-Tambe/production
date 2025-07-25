const userService = require('../services/user.service');
const { userValidationSchema } = require('../validation/user.validation');
const {
  generateToken
} = require('../utils/jwtProvider');
const { saveFiles } = require("../services/file.service");
const { getOwnerIdFromToken } = require('../utils/tokenHelper');
const { add_new_image } = require('../services/image.service');
// =============================
// 🧑 CREATE USER
// =============================
const create_user = async (req, res) => {
  try {
    const ownerId = await getOwnerIdFromToken(req);
     req.body.user_own_id = ownerId;
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(200).json({ success: false, message: error.details[0].message });
    }
     const imageData = {};
        if (req.files.user_sign) {
            imageData.user_sign = {
            img_own_id: ownerId,
            img_name: req.files.user_sign[0].originalname,
          };
        }
        if (req.files.user_img_id) {
          imageData.user_img_id = {
            img_own_id: ownerId,
            img_name: req.files.user_img_id[0].originalname,
          };
        }
        if (req.files.user_pan_img_id) {
          imageData.user_pan_img_id = {
            img_own_id: ownerId,
            img_name: req.files.user_pan_img_id[0].originalname,
          };
        }
        if (req.files.user_adhaar_front_img_id) {
          imageData.user_adhaar_front_img_id = {
            img_own_id: ownerId,
            img_name: req.files.user_adhaar_front_img_id[0].originalname,
          };
        }
        if (req.files.user_adhaar_back_img_id) {
          imageData.user_adhaar_back_img_id = {
            img_own_id: ownerId,
            img_name: req.files.user_adhaar_back_img_id[0].originalname,
          };
        }
        // Insert image references (if any)
        const insertedImages = await add_new_image(imageData);
        // Attach new image IDs to req.body for file saving
        req.body = {
          ...req.body,
          ...insertedImages,
        };

    const user = await userService.create_user(req.body);
        if (!user.success) {
      return res.status(200).json({
        success: false,
        message: user.message,
      });
    }
    // Save uploaded image files (if present)
    if (req.files) {
      if (req.files.user_sign) {
        await saveFiles(req.files.user_sign, ownerId, insertedImages.user_sign);
      }
      if (req.files.user_adhaar_back_img_id) {
        await saveFiles(req.files.user_adhaar_back_img_id, ownerId, insertedImages.user_adhaar_back_img_id);
      }
      if (req.files.user_adhaar_front_img_id) {
        await saveFiles(req.files.user_adhaar_front_img_id, ownerId, insertedImages.user_adhaar_front_img_id);
      }
      if (req.files.user_pan_img_id) {
        await saveFiles(req.files.user_pan_img_id, ownerId, insertedImages.user_pan_img_id);
      }
      if (req.files.user_img_id) {
        await saveFiles(req.files.user_img_id, ownerId, insertedImages.user_img_id);
      }
    }
    // 🔐 Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'User added successfully',
      data: user,
      token
    });
  } catch (err) {
    res.status(200).json({ success: false, message: err.message });
  }
};

// =============================
// ✏️ UPDATE USER
// =============================
const update_user = async (req, res) => {
  try {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: `Validation Error: ${error.details[0].message}` });
    }

    const user = await userService.update_user(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User updated successfully', data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: `Error updating user: ${err.message}` });
  }
};

// =============================
// ❌ DELETE USER
// =============================
const delete_user = async (req, res) => {
  try {
    const user = await userService.delete_user(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found or already deleted' });
    }

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: `Error deleting user: ${err.message}` });
  }
};

// =============================
// 📋 GET ALL USERS
// =============================
const get_all_user = async (req, res) => {
  try {
    const users = await userService.get_all_user();
    res.json({ success: true, message: 'Users fetched successfully', data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: `Error fetching users: ${err.message}` });
  }
};

// =============================
// 🔍 GET USER DETAILS BY TOKEN
// =============================
const get_user_details = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const user = await userService.get_user_details(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User details fetched successfully', data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: `Error fetching user details: ${err.message}` });
  }
};


module.exports = {
  create_user,
  update_user,
  delete_user,
  get_all_user,
  get_user_details
};
