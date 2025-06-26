const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: true, trim: true },
    user_add_date: { type: Date, default: Date.now },
    user_firm_id: { type: String, required: true, trim: true },
    user_own_id: { type: String, required: true, trim: true },
    user_name_prefix: { type: String, enum: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Er.'], default: 'Mr.' },
    user_first_name: { type: String, required: true, trim: true },
    user_middle_name: { type: String, trim: true },
    user_last_name: { type: String, required: true, trim: true },
    user_email: { type: String, required: true,unique: true, trim: true },

    user_phone: { type: String,unique: true, match: /^[0-9]{10}$/, trim: true },
    user_mobile: { type: String,unique: true, match: /^[0-9]{10}$/, trim: true },

    user_type: { type: String, enum: ['Admin', 'Employee', 'Owner', 'Other'], required: true },
    user_pre_id: { type: String, trim: true },
      user_post_id: { type: String, trim: true,required: true ,unique: true},

    user_mother_name: { type: String, trim: true },
    user_gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    user_cast: { type: String, trim: true },
    user_marital_status: { type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'], trim: true },

    user_max_qualification: { type: String, trim: true },
    user_birth_date: { type: Date, required: true },
    user_anniversary_date: { type: Date },

    user_pan_no: { type: String, match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, uppercase: true, sparse: true },
    user_gstin_no: { type: String, trim: true },
    user_tax_no: { type: String, trim: true },
    user_adhaar_no: { type: String, match: /^[0-9]{12}$/, unique: true },

    user_bank_name: { type: String, trim: true },
    user_bank_acc_name: { type: String, trim: true },
    user_bank_acc_no: { type: String, trim: true },
    user_bank_ifsc_code: { type: String, match: /^[A-Z]{4}0[A-Z0-9]{6}$/, uppercase: true },

    user_occupation: { type: String, trim: true },
    user_income: { type: Number, min: 0 },

    user_nominee_name: { type: String, trim: true },
    user_nominee_relation: { type: String, trim: true },

    user_designation: { type: String, trim: true },
    user_google_upi: { type: String, trim: true },
    user_other_upi: { type: String, trim: true },
    user_payment_mode: { type: String, enum: ['Cash', 'Bank Transfer', 'UPI', 'Cheque'], trim: true },

    user_shop_name: { type: String, trim: true },
    user_office_address: { type: String, trim: true },
    user_permanent_address: { type: String, trim: true },
    user_current_address: { type: String, trim: true },

    user_village: { type: String, trim: true },
    user_ward_no: { type: String, trim: true },
    user_tahasil: { type: String, trim: true },
    user_city: { type: String, trim: true },
    user_country: { type: String, trim: true, default: 'India' },
    user_pincode: { type: String, match: /^[1-9][0-9]{5}$/ },
    user_state: { type: String, trim: true },

    user_other_info: { type: String, trim: true },

    user_sign: { type: String }, // file reference (e.g. URL or file path)
    user_img_id: { type: String },
    user_pan_img_id: { type: String },
    user_adhaar_front_img_id: { type: String },
    user_adhaar_back_img_id: { type: String }
});

module.exports = mongoose.model("User", userSchema);
