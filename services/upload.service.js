// This is a placeholder for any business logic, such as saving to a database
// For now, we just return basic file info

const processUpload = async (file) => {
  // Basic info you might want to return or save
  return {
    originalName: file.originalname,
    fileName: file.filename,
    mimeType: file.mimetype,
    size: file.size,
    path: file.path, // 'uploads/<filename>'
    uploadedAt: new Date()
  };
};

module.exports = {
  processUpload
};
