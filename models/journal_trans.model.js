const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const journalTransSchema = new mongoose.Schema({
  jrtr_jrnl_id: {
    type: Number,
    required: true
  },
  jrtr_firm_id: {
    type: Number,
    required: true
  },
  jrtr_own_id: {
    type: Number,
    required: true
  },
  jrtr_user_id: {
    type: Number,
  },
  jrtr_add_date: {
    type: String,
    default: () => {
      const now = new Date();
      return now.toISOString().slice(0, 10).split('-').reverse().join('-');
    }
  },
  jrtr_date: {
    type: String,
    required: true
  },
  jrtr_panel: {
    type: String,
    required: true,
    trim: true
  },
  jrtr_crdr: {
    type: String,
    enum: ['CR', 'DR'],
    required: true
  },
  jrtr_cr_acc_id: {
    type: Number,
  },
  jrtr_dr_acc_id: {
    type: Number,
  },
  jrtr_cr_amt: {
    type: [Number, String],
    required: true
  },
  jrtr_dr_amt: {
    type: [Number, String],
    required: true
  },
  jrtr_acc_info: {
    type: String,
    default: ''
  },
  jrtr_other_info: {
    type: String,
    default: ''
  }
}, {
  collection: 'journal_trans',
  timestamps: false
});

// Auto-increment jrtr_id
journalTransSchema.plugin(AutoIncrement, { inc_field: 'jrtr_id' });

module.exports = mongoose.model('JournalTrans', journalTransSchema);
