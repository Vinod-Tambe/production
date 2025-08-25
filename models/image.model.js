const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const imageSchema = new mongoose.Schema({
  img_own_id: {
    type: Number,
    required: true,
    default: 0,
  },
  img_add_date: {
    type: Date,
   default: Date.now,
  },
  img_name: {
    type: String,
    required: true,
    default: "",
  },
  img_ext: {
    type: String,
    required: true,
    default: "",
  },
});

// ✅ Auto-increment for img_id
imageSchema.plugin(AutoIncrement, { inc_field: 'img_id' });

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
