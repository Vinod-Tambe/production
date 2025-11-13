const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const stockSchema = new Schema(
    {
        st_add_date: {
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
        st_own_id: { type: Number, required: true },
        st_firm_id: { type: Number, required: true },
        st_user_id: { type: Number, required: true },
        st_staff_id: { type: Number, required: true },
        st_image_id: { type: Number, default: null },
        st_referance_panel: { type: String, trim: true, default: null },
        st_referance_id: { type: Number, default: null },
        st_metal_type: {
            type: String,
            required: true,
            enum: ['gold', 'silver', 'platinum'],
            trim: true
        },
        st_item_name: { type: String, required: true, trim: true },
        st_quantity: { type: Number, required: true, min: 1 },
        st_rate: {
            type: Number,
            required: true,
            min: 0
        },
        st_gs_weight: { type: Number, required: true, min: 0 },
        st_gs_type: { type: String, enum: ['GM', 'KG'], required: true },
        st_nt_weight: { type: Number, required: true, min: 0 },
        st_nt_type: { type: String, enum: ['GM', 'KG'], required: true },
        st_purity: { type: Number, required: true, min: 0, max: 100 },
        st_fine_weight: { type: Number, required: true, min: 0 },
        st_valuation: { type: Number, required: true, min: 0 },
        st_final_valuation: { type: Number, required: true, min: 0 },
        st_status: {
            type: String,
            enum: ['active', 'inactive', 'sold', 'returned'],
            default: 'active'
        },
    },
    {
        timestamps: true
    }
);
// Apply mongoose-sequence for st_id
stockSchema.plugin(AutoIncrement, { inc_field: 'st_id' });

module.exports = mongoose.model('Stock', stockSchema);