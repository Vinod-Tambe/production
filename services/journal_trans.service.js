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

async function get_all_acc_journal_trans(start_date = null, end_date, firm_id = null, acc_id = 'N', acc_pre_acc_arr = 'N') {
    try {
        if (!end_date || isNaN(new Date(end_date))) {
            throw new Error('Invalid or missing end_date');
        }

        const matchStage = {
            jrtr_date: { $lte: end_date },
        };

        if (start_date && !isNaN(new Date(start_date))) {
            matchStage.jrtr_date.$gte = start_date;
        }
        if (acc_id !== 'N') {
            matchStage.$or = [
                { jrtr_cr_acc_id: acc_id },
                { jrtr_dr_acc_id: acc_id }
            ];
        }
        if (Array.isArray(acc_pre_acc_arr) && acc_pre_acc_arr.length > 0) {
            matchStage.acc_pre_acc= { $in: acc_pre_acc_arr };
        }

        if (firm_id && firm_id !== 'N') {
            matchStage.jrtr_firm_id = Number(firm_id);
        }
        const result = await JournalTrans.aggregate([
            { $match: matchStage },
            {
                $facet: {
                    credit: [
                        {
                            $group: {
                                _id: { $ifNull: ["$jrtr_cr_acc_id", "$jrtr_dr_acc_id"] },
                                total_cr_amt: { $sum: { $toDouble: { $ifNull: ["$jrtr_cr_amt", 0] } } },
                            },
                        },
                    ],
                    debit: [
                        {
                            $group: {
                                _id: { $ifNull: ["$jrtr_dr_acc_id", "$jrtr_cr_acc_id"] },
                                total_dr_amt: { $sum: { $toDouble: { $ifNull: ["$jrtr_dr_amt", 0] } } },
                            },
                        },
                    ],
                },
            },
            {
                $project: {

                    combined: { $concatArrays: ["$credit", "$debit"] },
                },
            },
            { $unwind: "$combined" },
            {
                $group: {
                    _id: "$combined._id",
                    total_cr_amt: { $sum: "$combined.total_cr_amt" },
                    total_dr_amt: { $sum: "$combined.total_dr_amt" },
                },
            },
            {
                $project: {
                    _id: 0,
                    acc_id: { $toString: "$_id" },
                    total_cr_amt: { $round: ["$total_cr_amt", 2] },
                    total_dr_amt: { $round: ["$total_dr_amt", 2] },
                },
            },
        ]);

        return result;
    } catch (error) {
        console.error('Error in get_all_acc_journal_trans:', error);
        throw error;
    }
}

module.exports = {
    get_all_acc_journal_trans,
    create_journal_trans_entry,
    delete_journal_trans_entry
};
