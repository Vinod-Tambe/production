const uploadService = require('../services/upload.service');

const uploadImage = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(200).json({ success: false, message: 'No image file uploaded' });
    }

    // Call the service to handle the uploaded file
    const result = await uploadService.processUpload(req.file);

    // Return a success response with file details
    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: result
    });
  } catch (error) {
    console.error('Upload error:', error.message);
    res.status(200).json({
      success: false,
      message: 'Server error during upload',
      error: error.message
    });
  }
};

module.exports = {
  uploadImage
};
