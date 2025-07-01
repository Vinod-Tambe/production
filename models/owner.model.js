const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ownerSchema = new mongoose.Schema({
  own_id: {
    type: Number,
    unique: true,
  },
  own_add_date: {
    type: Date,
  },
  own_soft_date: {
    type: Date,
  },
  own_last_login: {
    type: Date,
  },
  own_fname: {
    type: String,
    required: true,
    index: true,
  },
  own_mname: {
    type: String,
    required: true,
    index: true,
  },
  own_lname: {
    type: String,
    required: true,
    index: true,
  },
  own_mobile_no: {
    type: Number,
    required: true,
    unique: true,
    index: true,
  },
  own_phone_no: {
    type: Number,
  },
  own_city: {
    type: String,
  },
  own_state: {
    type: String,
  },
  own_country: {
    type: String,
  },
  own_village: {
    type: String,
  },
  own_address: {
    type: String,
  },
  own_login_id: {
    type: String,
    unique: true,
    sparse: true,
    index: true,
  },
  own_password: {
    type: String,
  },
  own_payment_gateway: {
    type: String,
  },
  own_merchant_id: {
    type: String,
  },
  own_salt_key: {
    type: String,
  },
  own_salt_index_key: {
    type: String,
  },
  own_otp: {
    type: String,
  },
  own_otp_expiry: {
    type: String,
  },
  own_email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true,
    index: true,
  },
}, {
  timestamps: true,
});

// Auto-increment for own_id
ownerSchema.plugin(AutoIncrement, { inc_field: "own_id" });

module.exports = mongoose.model("Owner", ownerSchema);
