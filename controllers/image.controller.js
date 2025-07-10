const path = require("path");
const { get_image_id } = require("../services/image.service");
const get_image_file = (req, res) => {
  const folder = req.params.folder;    // "9"
  const imageName = req.params.image;  // "91.png"
  const fullPath = path.join(folder, imageName);
  get_image_id(fullPath)
    .then(imagePath => {
      res.sendFile(imagePath);
    })
    .catch(err => {
      //console.error(err);
      res.status(404).json({ error: "Image not found" });
    });
};


module.exports = { get_image_file };
