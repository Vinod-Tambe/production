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
    default: () => {
      const now = new Date();
      return now.toLocaleString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    },
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
