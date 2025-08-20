const Journal = require('../models/Journal');

/*
 * Create a new journal entry.
 */
async function create_journal_entry(data) {
    try {
        const newJournal = new Journal(data);
        const saved = await newJournal.save();
        return saved;
    } catch (err) {
        throw new Error(`Failed to create journal entry: ${err.message}`);
    }
}

/*
 * Delete a journal entry by jrnl_id.
 */
async function delete_journal_entry(jrnl_id, jrnl_own_id, jrnl_firm_id) {
    try {
        const deleted = await Journal.findOneAndDelete({ jrnl_id, jrnl_own_id, jrnl_firm_id });
        return deleted;
    } catch (err) {
        throw new Error(`Failed to delete journal entry: ${err.message}`);
    }
}

module.exports = {
    create_journal_entry,
    delete_journal_entry
};
