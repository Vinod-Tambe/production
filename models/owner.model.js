const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ownerSchema = new mongoose.Schema({
  own_id: {
    type: Number,
    unique: true,
  },
  own_add_date: {
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
  own_soft_date: {
    type: Date,
    default: null,
  },
  own_last_login: {
    type: Date,
    default: null,
  },
  own_fname: {
    type: String,
    required: true,
    index: true,
    default: "",
  },
  own_mname: {
    type: String,
    required: true,
    index: true,
    default: "",
  },
  own_lname: {
    type: String,
    required: true,
    index: true,
    default: "",
  },
  own_mobile_no: {
    type: Number,
    required: true,
    unique: true,
    index: true,
    default: 0,
  },
  own_phone_no: {
    type: Number,
    default: 0,
  },
  own_city: {
    type: String,
    default: "",
  },
  own_state: {
    type: String,
    default: "",
  },
  own_country: {
    type: String,
    default: "",
  },
  own_village: {
    type: String,
    default: "",
  },
  own_address: {
    type: String,
    default: "",
  },
  own_login_id: {
    type: String,
    unique: true,
    sparse: true,
    index: true,
    default: "",
  },
  own_password: {
    type: String,
    default: "",
  },
  own_payment_gateway: {
    type: String,
    default: "",
  },
  own_merchant_id: {
    type: String,
    default: "",
  },
  own_salt_key: {
    type: String,
    default: "",
  },
  own_salt_index_key: {
    type: String,
    default: "",
  },
  own_otp: {
    type: String,
    default: "",
  },
  own_otp_expiry: {
    type: String,
    default: "",
  },
  own_email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true,
    index: true,
    default: "",
  },
}, {
  timestamps: true,
});

ownerSchema.plugin(AutoIncrement, { inc_field: "own_id" });

module.exports = mongoose.model("Owner", ownerSchema);
