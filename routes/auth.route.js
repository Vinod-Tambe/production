const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Owner login
router.post('/owner/login', authController.owner_login);

// Admin login
router.post('/admin/login', authController.admin_login);

module.exports = router;
