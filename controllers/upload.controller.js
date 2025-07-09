const uploadService = require("../services/file.service");

const uploadImages = async (req, res) => {
  try {
    // Check if files are uploaded
    if (!req.files || !req.files.imgfile || !req.files.newimg) {
      return res.status(400).json({ submit: false, msg: "Both files are required." });
    }

    // Normalize to arrays for easier processing
    const imgfiles = Array.isArray(req.files.imgfile) ? req.files.imgfile : [req.files.imgfile];
    const newimgs = Array.isArray(req.files.newimg) ? req.files.newimg : [req.files.newimg];

    // Check if the number of files match (optional)
    if (imgfiles.length !== newimgs.length) {
      return res.status(400).json({ submit: false, msg: "The number of imgfile and newimg files must match." });
    }

    // Process all file pairs in parallel or sequentially
    const uploadResults = [];
    for (let i = 0; i < imgfiles.length; i++) {
      const result = await uploadService.processImageUpload(imgfiles[i], newimgs[i]);
      uploadResults.push(result);
    }

    // Return array of uploaded files info
    res.json({
      submit: true,
      files: uploadResults, // array of { image: ..., newimg: ... }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ submit: false, msg: "Server error during file upload." });
  }
};

module.exports = { uploadImages };
