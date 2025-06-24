const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller'); // adjust path as needed

// Create a new admin
router.post('/create', adminController.create_admin);

// Get admin details by ID
router.get('/get/:id', adminController.get_admin_details);

// Update admin details by ID
router.put('/update/:id', adminController.update_admin_details);

module.exports = router;
