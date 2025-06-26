const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// ==============================
// 🧑 CREATE NEW USER
// POST /api/users
// ==============================
router.post('/create/', userController.create_user);

// ==============================
// ✏️ UPDATE USER BY ID
// PUT /api/users/:id
// ==============================
router.put('/update/:id', userController.update_user);

// ==============================
// ❌ DELETE USER BY ID
// DELETE /api/users/:id
// ==============================
router.delete('/delete/:id', userController.delete_user);

// ==============================
// 📋 GET ALL USERS
// GET /api/users
// ==============================
router.get('/get/', userController.get_all_user);

// ==============================
// 🔍 GET SINGLE USER BY ID
// GET /api/users/:id
// ==============================
router.get('/get/:id', userController.get_user_details);

module.exports = router;
