const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  img_id: {
    type: Number,
    required: true,
    unique: true,
  },
  img_own_id: {
    type: Number,
    required: true,
  },
  img_firm_id: {
    type: Number,
    required: true,
  },
  img_add_date: {
    type: Date,
    default: Date.now,
  },
  img_name: {
    type: String,
    required: true,
  },
    img_prefix: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
