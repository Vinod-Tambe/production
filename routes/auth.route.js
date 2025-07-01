const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Owner login
router.post('/owner/login', authController.owner_login);

// Admin login
router.post('/admin/login', authController.admin_login);

router.post('/owner/send-otp', authController.send_owner_otp);
router.post('/owner/login-otp', authController.owner_login_with_otp);

module.exports = router;
