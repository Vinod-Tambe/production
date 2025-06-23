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
    index: true, // for faster name searches
  },
    own_mname: {
    type: String,
    required: true,
    index: true, // for faster name searches
  },
  own_lname: {
    type: String,
    required: true,
    index: true, // for faster name searches
  },
  own_mobile_no: {
    type: Number,
    required: true,
    unique: true, // enforce unique mobile numbers
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
    sparse: true, // allows null values while enforcing uniqueness
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
}, {
  timestamps: true,
});

// Auto-increment for own_id
ownerSchema.plugin(AutoIncrement, { inc_field: "own_id" });

// Compound index example (optional)
// ownerSchema.index({ own_fname: 1, own_lname: 1 });

module.exports = mongoose.model("Owner", ownerSchema);
