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
      type: Date,
      required: [true, 'Add date is required'],
      default: Date.now,
    },
    girv_firm_id: {
      type: Schema.Types.ObjectId,
      ref: 'Firm',
      required: [true, 'Firm ID is required'],
    },
    girv_own_id: {
      type: Schema.Types.ObjectId,
      ref: 'Owner',
      required: [true, 'Owner ID is required'],
    },
    girv_user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    girv_staff_id: {
      type: Schema.Types.ObjectId,
      ref: 'Staff',
      required: [true, 'Staff ID is required'],
    },
    girv_start_date: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    girv_loan_no: {
      type: String,
      unique: true, // Ensure unique loan number (e.g., A1, A2, B1)
      required: [true, 'Loan number is required'],
    },
    girv_loan_pre_no: {
      type: String,
      unique: true, // Ensure unique pre-loan number (e.g., A1, A2, B1)
      required: [true, 'Pre-loan number is required'],
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
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: [true, 'First interest credit account ID is required'],
    },
    girv_first_int_dr_acc_id: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: [true, 'First interest debit account ID is required'],
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
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: [true, 'Cash account ID is required'],
    },
    girv_bank_acc_id: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: [true, 'Bank account ID is required'],
    },
    girv_online_acc_id: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: [true, 'Online account ID is required'],
    },
    girv_card_acc_id: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: [true, 'Card account ID is required'],
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
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: [true, 'Debit account ID is required'],
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

// Apply mongoose-sequence for girv_loan_no with prefix
girviSchema.plugin(AutoIncrement, {
  inc_field: 'girv_loan_no',
  id: 'girv_loan_no_seq', // Unique counter ID for girv_loan_no
  inc_type: String, // Output as string (e.g., A1, B1)
  reference_fields: ['prefix_loan'], // Use a virtual prefix field
});

// Apply mongoose-sequence for girv_loan_pre_no with prefix
girviSchema.plugin(AutoIncrement, {
  inc_field: 'girv_loan_pre_no',
  id: 'girv_loan_pre_no_seq', // Unique counter ID for girv_loan_pre_no
  inc_type: String, // Output as string (e.g., A1, B1)
  reference_fields: ['prefix_loan_pre'], // Use a virtual prefix field
});

// Virtual fields to store prefixes temporarily
girviSchema.virtual('prefix_loan').get(function () {
  return this._prefix_loan || 'A'; // Default to 'A' if not set
}).set(function (value) {
  this._prefix_loan = value;
});

girviSchema.virtual('prefix_loan_pre').get(function () {
  return this._prefix_loan_pre || 'A'; // Default to 'A' if not set
}).set(function (value) {
  this._prefix_loan_pre = value;
});

// Pre-save middleware to format girv_loan_no and girv_loan_pre_no
girviSchema.pre('save', async function (next) {
  if (this.isNew) {
    // Ensure prefixes are set
    const prefixLoan = this.prefix_loan || 'A';
    const prefixLoanPre = this.prefix_loan_pre || 'A';

    // The sequence value is handled by mongoose-sequence
    // Format will be set by the plugin (e.g., A1, B1)
    this.girv_loan_no = `${prefixLoan}${this.girv_loan_no || ''}`;
    this.girv_loan_pre_no = `${prefixLoanPre}${this.girv_loan_pre_no || ''}`;
  }
  next();
});

// Create the Girvi model
const Girvi = mongoose.model('Girvi', girviSchema);

module.exports = Girvi;
