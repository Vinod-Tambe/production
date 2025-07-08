const express = require('express');
const router = express.Router();

// Import Multer config
const upload = require('../middleware/multer.authenticate');

// Import controller
const uploadController = require('../controllers/upload.controller');

// Route: POST /api/upload
router.post('/upload', upload.single('image'), uploadController.uploadImage);

module.exports = router;
