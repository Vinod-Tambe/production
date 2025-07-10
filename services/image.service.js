const Image = require('../models/image.model');
const path = require("path");
const fs = require("fs");

// Add a new image
const add_new_image = async (imagesObj) => {
  if (typeof imagesObj !== 'object' || Array.isArray(imagesObj)) {
    throw new Error('Input must be an object with image entries');
  }

  const keys = Object.keys(imagesObj);
  const result = {};

  for (const key of keys) {
    const imageData = { ...imagesObj[key] };
    if (!imageData.img_ext && imageData.img_name) {
      const parts = imageData.img_name.split('.');
      if (parts.length > 1) {
        imageData.img_ext = parts.pop().toLowerCase();
      } else {
        throw new Error('img_ext is missing and could not be extracted from img_name.');
      }
    }

    const image = new Image(imageData);
    const saved = await image.save();  // plugin works here, img_id should be set
    result[key] = saved.img_id;
  }

  return result;
};

const get_image_id = (imageName) => {
  const extensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"]; // You can add more if needed

  return new Promise((resolve, reject) => {
    let found = false;

    for (let ext of extensions) {
      const imagePath = path.join(__dirname, "..", "public", "images", imageName + ext);
      if (fs.existsSync(imagePath)) {
        found = true;
        return resolve(imagePath);
      }
    }

    if (!found) {
      return reject(new Error("Image not found with any supported extension."));
    }
  });
};

// Get all images
const get_all_images = async () => {
  return await Image.find();
};

// Get a single image by img_id
const get_image_by_id = async (img_id) => {
  return await Image.findOne({ img_id });
};

const update_image = async (updateObj) => {
  if (typeof updateObj !== 'object' || Array.isArray(updateObj)) {
    throw new Error('Input must be an object with keys mapping to { img_id, updateData }');
  }

  const keys = Object.keys(updateObj);
  const resultObj = {};

  for (const key of keys) {
    const { img_id, updateData } = updateObj[key];
    if (!img_id || !updateData) {
      throw new Error(`Missing img_id or updateData for key: ${key}`);
    }

    // Update and get the new document
    const updatedDoc = await Image.findOneAndUpdate({ img_id }, updateData, { new: true });

    if (updatedDoc) {
      resultObj[key] = { img_id: updatedDoc.img_id };
    } else {
      // Optional: handle case where no document found
      // For now, just skip or throw error
      // throw new Error(`Image with img_id ${img_id} not found`);
    }
  }

  return resultObj;
};


// Delete an image by img_id
const delete_image = async (img_id) => {
  return await Image.findOneAndDelete({ img_id });
};

module.exports = {
  add_new_image,
  get_all_images,
  get_image_by_id,
  update_image,
  delete_image,
  get_image_id
};
