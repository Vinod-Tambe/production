const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const upload = require("../middleware/multer.authenticate");
const ownerAuthenticate = require("../middleware/owner.authenticate");
// Define multer upload fields matching frontend file input names
const uploadFields = upload.fields([
    { name: "user_img_file", maxCount: 1 },
    { name: "user_adhaar_front_file", maxCount: 1 },
    { name: "user_adhaar_back_file", maxCount: 1 },
    { name: "user_pan_file", maxCount: 1 },
    { name: "user_sign_file", maxCount: 1 },
]);
// ==============================
// 🧑 CREATE NEW USER
// POST /api/users
// ==============================
router.post('/create/', ownerAuthenticate,
    uploadFields, userController.create_user);

// ==============================
// ✏️ UPDATE USER BY ID
// PUT /api/users/:id
// ==============================
router.put('/update/:id', ownerAuthenticate,
    uploadFields, userController.update_user);

// ==============================
// ❌ DELETE USER BY ID
// DELETE /api/users/:id
// ==============================
router.delete('/delete/:id', ownerAuthenticate,
    uploadFields, userController.delete_user);

// ==============================
// 📋 GET ALL USERS
// GET /api/users
// ==============================
router.get('/get/', ownerAuthenticate,
    uploadFields, userController.get_all_user);

// ==============================
// 🔍 GET SINGLE USER BY ID
// GET /api/users/:id
// ==============================
router.get('/get/:id', ownerAuthenticate,
    uploadFields, userController.get_user_details);

module.exports = router;
