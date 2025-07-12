const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  admin_fname: {
    type: String,
    required: true,
    trim: true,
    default: "",
  },
  admin_lname: {
    type: String,
    required: true,
    trim: true,
    default: "",
  },
  admin_email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    default: "",
  },
  admin_phone: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{10}$/,
    default: "",
  },
  admin_password: {
    type: String,
    required: true,
    default: "",
  },
  admin_add_date: {
    type: Date,
    default: Date.now,
  },
  admin_last_login: {
    type: Date,
    default: null,
  },
}, {
  versionKey: false,
  timestamps: true,
});

module.exports = mongoose.model("Admin", adminSchema);
