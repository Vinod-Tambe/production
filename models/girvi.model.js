const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

// Define the Girvi schema
const girviSchema = new Schema(
  {
    girv_id: {
      type: Number,
      unique: true, // Auto-incremented by mongoose-sequence
    },
    girv_add_date: {
    type: String,
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
    girv_firm_id: {
      type: Number,
      required: [true, 'Firm ID is required'],
      min: [0, 'Firm ID cannot be negative'],
      default: 0,
    },
    girv_own_id: {
      type: Number,
      required: [true, 'Owner ID is required'],
      min: [0, 'Owner ID cannot be negative'],
      default: 0,
    },
    girv_user_id: {
      type: Number,
      required: [true, 'User ID is required'],
      min: [0, 'User ID cannot be negative'],
      default: 0,
    },
    girv_staff_id: {
      type: Number,
      required: [true, 'Staff ID is required'],
      min: [0, 'Staff ID cannot be negative'],
      default: 0,
    },
    girv_start_date: {
      type: String,
    required: true,
    },
    girv_loan_no: {
      type: String,
    },
    girv_loan_pre_no: {
      type: String,
    },
    girv_prin_amt: {
      type: Number,
      required: [true, 'Principal amount is required'],
      min: [0, 'Principal amount cannot be negative'],
      default: 0,
    },
    girv_process_per: {
      type: Number,
      required: [true, 'Processing percentage is required'],
      min: [0, 'Processing percentage cannot be negative'],
      default: 0,
    },
    girv_process_amt: {
      type: Number,
      required: [true, 'Processing amount is required'],
      min: [0, 'Processing amount cannot be negative'],
      default: 0,
    },
    girv_packet_no: {
      type: String,
      required: [true, 'Packet number is required'],
      trim: true,
    },
    girv_locker_no: {
      type: String,
      required: [true, 'Locker number is required'],
      trim: true,
    },
    girv_charge_per: {
      type: Number,
      required: [true, 'Charge percentage is required'],
      min: [0, 'Charge percentage cannot be negative'],
      default: 0,
    },
    girv_charge_amt: {
      type: Number,
      required: [true, 'Charge amount is required'],
      min: [0, 'Charge amount cannot be negative'],
      default: 0,
    },
    girv_roi: {
      type: Number,
      required: [true, 'Rate of interest is required'],
      min: [0, 'Rate of interest cannot be negative'],
      default: 0,
    },
    girv_roi_type: {
      type: String,
      required: [true, 'ROI type is required'],
      enum: {
        values: ['fixed', 'floating', 'compound', 'simple'],
        message: '{VALUE} is not a valid ROI type',
      },
      trim: true,
    },
    girv_final_amt: {
      type: Number,
      required: [true, 'Final amount is required'],
      min: [0, 'Final amount cannot be negative'],
      default: 0,
    },
    girv_first_int: {
      type: Number,
      required: [true, 'First interest is required'],
      min: [0, 'First interest cannot be negative'],
      default: 0,
    },
    girv_first_int_cr_acc_id: {
      type: Number,
      required: [true, 'First interest credit account ID is required'],
      min: [0, 'First interest credit account ID cannot be negative'],
      default: 0,
    },
    girv_first_int_dr_acc_id: {
      type: Number,
      required: [true, 'First interest debit account ID is required'],
      min: [0, 'First interest debit account ID cannot be negative'],
      default: 0,
    },
    girv_cash_amt: {
      type: Number,
      required: [true, 'Cash amount is required'],
      min: [0, 'Cash amount cannot be negative'],
      default: 0,
    },
    girv_bank_amt: {
      type: Number,
      required: [true, 'Bank amount is required'],
      min: [0, 'Bank amount cannot be negative'],
      default: 0,
    },
    girv_online_amt: {
      type: Number,
      required: [true, 'Online amount is required'],
      min: [0, 'Online amount cannot be negative'],
      default: 0,
    },
    girv_card_amt: {
      type: Number,
      required: [true, 'Card amount is required'],
      min: [0, 'Card amount cannot be negative'],
      default: 0,
    },
    girv_cash_acc_id: {
      type: Number,
      required: [true, 'Cash account ID is required'],
      min: [0, 'Cash account ID cannot be negative'],
      default: 0,
    },
    girv_bank_acc_id: {
      type: Number,
      required: [true, 'Bank account ID is required'],
      min: [0, 'Bank account ID cannot be negative'],
      default: 0,
    },
    girv_online_acc_id: {
      type: Number,
      required: [true, 'Online account ID is required'],
      min: [0, 'Online account ID cannot be negative'],
      default: 0,
    },
    girv_card_acc_id: {
      type: Number,
      required: [true, 'Card account ID is required'],
      min: [0, 'Card account ID cannot be negative'],
      default: 0,
    },
    girv_cash_info: {
      type: String,
      trim: true,
      default: '',
    },
    girv_bank_info: {
      type: String,
      trim: true,
      default: '',
    },
    girv_online_info: {
      type: String,
      trim: true,
      default: '',
    },
    girv_card_info: {
      type: String,
      trim: true,
      default: '',
    },
    girv_dr_acc_id: {
      type: Number,
      required: [true, 'Debit account ID is required'],
      min: [0, 'Debit account ID cannot be negative'],
      default: 0,
    },
    girv_other_info: {
      type: String,
      trim: true,
      default: '',
    },
    girv_pay_info: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Apply mongoose-sequence for girv_id
girviSchema.plugin(AutoIncrement, { inc_field: 'girv_id' });

// Virtual field to store the prefix
girviSchema.virtual('prefix').get(function () {
  return this._prefix || 'E'; // Default to 'A' if not set
}).set(function (value) {
  if (value && !/^[A-Z]$/.test(value)) {
    throw new Error('Prefix must be a single uppercase letter');
  }
  this._prefix = "E";
});

// Counter model for custom string-based auto-increment
const Counter = mongoose.model(
  'Counter',
  new Schema({
    id: { type: String, required: true, unique: true }, // Changed from _id to id to match existing collection
    seq: { type: Number, default: 0 },
  })
);

// Pre-save middleware to generate unique girv_loan_no and girv_loan_pre_no
girviSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const prefix = this.prefix || 'E';
      // console.log('Generating loan numbers with prefix:', prefix);

      // Generate sequence for the prefix
      const counter = await Counter.findOneAndUpdate(
        { id: `loan_sequence_${prefix}` },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      // Set both girv_loan_no and girv_loan_pre_no to the same value
      this.girv_loan_no = counter.seq;
      this.girv_loan_pre_no = prefix;
    } catch (error) {
      // console.error('Error in pre-save middleware:', error);
      return next(new Error(`Failed to generate loan numbers: ${error.message}`));
    }
  }
  next();
});

// Create the Girvi model
const Girvi = mongoose.model('Girvi', girviSchema);

// Drop conflicting index if it exists
mongoose.connection.collections['counters'].dropIndex('id_1_reference_value_1', { maxTimeMS: 30000 }, (err) => {
  if (err && err.code !== 27) { // Ignore "index not found" error
  } else {
  }
});

module.exports = Girvi;