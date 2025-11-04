const Stock = require('../models/stock.model');

const create_stock = async (stockData) => {
    try {
        if (Array.isArray(stockData)) {
            const savedStocks = [];
            for (const data of stockData) {
                const stock = new Stock(data);
                const saved = await stock.save(); // runs pre/post hooks (mongoose-sequence)
                savedStocks.push(saved);
            }
            return savedStocks;
        }

        // Single stock
        const stock = new Stock(stockData);
        const savedStock = await stock.save();
        return savedStock;

    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Stock ID already exists or duplicate key violation.');
        }
        throw new Error(`Failed to create stock: ${error.message}`);
    }
};


const update_stock = async (st_id, updateData) => {
    try {
        const updatedStock = await Stock.findOneAndUpdate(
            { st_id },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedStock) {
            throw new Error('Stock not found');
        }

        return updatedStock;
    } catch (error) {
        throw new Error(`Failed to update stock: ${error.message}`);
    }
};

const delete_stock = async (st_id, hardDelete = false) => {
    try {
        if (hardDelete) {
            const deletedStock = await Stock.findOneAndDelete({ st_id });
            if (!deletedStock) {
                throw new Error('Stock not found');
            }
            return deletedStock;
        } else {
            const updatedStock = await Stock.findOneAndUpdate(
                { st_id },
                { $set: { st_status: 'inactive' } },
                { new: true }
            );
            if (!updatedStock) {
                throw new Error('Stock not found');
            }
            return updatedStock;
        }
    } catch (error) {
        throw new Error(`Failed to delete stock: ${error.message}`);
    }
};

const get_stock_details = async (st_id) => {
    try {
        const stock = await Stock.findOne({ st_id }).lean();
        if (!stock) {
            throw new Error('Stock not found');
        }
        return stock;
    } catch (error) {
        throw new Error(`Failed to fetch stock details: ${error.message}`);
    }
};

const get_all_stock = async (filters = {}) => {
       try {
        const stock = await Stock.find(filters).select(`
        -_id
        -st_add_date
        -createdAt
        -updatedAt
        -__v
        `).lean();
        if (!stock) {
            throw new Error('Stock not found');
        }
        return stock;
    } catch (error) {
        throw new Error(`Failed to fetch stock details: ${error.message}`);
    }
};

module.exports = {
    create_stock,
    update_stock,
    delete_stock,
    get_stock_details,
    get_all_stock
};