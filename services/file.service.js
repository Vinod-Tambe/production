const fs = require('fs').promises;
const path = require('path');

const saveFiles = async (file, ownerId, uniqueName) => {
  if (!file || !file[0].originalname) {
    throw new Error('Invalid file object or missing originalname');
  }
  if (!ownerId) {
    throw new Error('ownerId is required');
  }
  if (!uniqueName) {
    throw new Error('uniqueName is required');
  }

  // Build upload directory path
  const uploadDir = path.join(__dirname, '..', "public", "images", String(ownerId));
  await fs.mkdir(uploadDir, { recursive: true });

  //const savedFileNames = [];

  // Compose the file name safely
  const fileExtension = path.extname(file[0].originalname);
  const fileName = `${uniqueName}${fileExtension}`;
  const filePath = path.join(uploadDir, fileName);

  await fs.writeFile(filePath, file[0].buffer);
  //savedFileNames.push(fileName);

  return 'File Save Successfully';
};

module.exports = {
  saveFiles,
};
