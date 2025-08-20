const JournalTrans = require('../models/journal_trans.model');

/**
 * Create multiple journal transaction entries.
 */
async function create_journal_trans_entry(entries) {
    try {
        if (!Array.isArray(entries) || entries.length === 0) {
            throw new Error('Input must be a non-empty array.');
        }

        const inserted = await JournalTrans.insertMany(entries);
        return inserted;
    } catch (err) {
        throw new Error(`Failed to create journal transaction entries: ${err.message}`);
    }
}

/**
 * Delete journal transaction entries by jrtr_jrnl_id.
 */
async function delete_journal_trans_entry(jrtr_jrnl_id) {
    try {
        const deleted = await JournalTrans.deleteMany({ jrtr_jrnl_id });
        return deleted;
    } catch (err) {
        throw new Error(`Failed to delete journal transactions: ${err.message}`);
    }
}

module.exports = {
    create_journal_trans_entry,
    delete_journal_trans_entry
};
