const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const journalSchema = new mongoose.Schema({
  jrnl_id: {
    type: Number,
    unique: true
  },
  jrnl_firm_id: {
    type: Number,
    required: true
  },
  jrnl_own_id: {
    type: Number,
    required: true
  },
  jrnl_user_id: {
    type: Number,
  },
  jrnl_add_date: {
    type: String,
    default: () => {
      const now = new Date();
      return now.toISOString().slice(0, 10).split('-').reverse().join('-');
    }
  },
  jrnl_date: {
    type: String,
    required: true,
  },
  jrnl_amt: {
    type: [Number, String],
    required: true
  },
  jrnl_panel: {
    type: String,
    required: true,
    trim: true
  },
  jrnl_other_inof: {
    type: String,
    default: ''
  }
}, {
  collection: 'journal',
  timestamps: false
});

// Auto-increment jrnl_id
journalSchema.plugin(AutoIncrement, { inc_field: 'jrnl_id' });

module.exports = mongoose.model('Journal', journalSchema);
