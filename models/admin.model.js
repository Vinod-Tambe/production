const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  admin_fname: {
    type: String,
    required: true,
    trim: true,
  },
  admin_lname: {
    type: String,
    required: true,
    trim: true,
  },
  admin_email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  admin_phone: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{10}$/,
  },
  admin_password: {
    type: String,
    required: true,
  },
  admin_add_date: {
    type: Date,
    default: Date.now,
  },
  admin_last_login: {
    type: Date,
  },
}, {
  versionKey: false,
  timestamps: true,
});

module.exports = mongoose.model("Admin", adminSchema);
