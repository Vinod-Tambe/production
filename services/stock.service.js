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

const get_all_stock = async (filters = {}, pagination = { page: 1, limit: 10 }) => {
    try {
        const { page = 1, limit = 10 } = pagination;
        const skip = (page - 1) * limit;

        // Build query
        const query = { ...filters };
        if (filters.st_status) {
            query.st_status = filters.st_status;
        }

        const [stocks, total] = await Promise.all([
            Stock.find(query)
                .sort({ st_add_date: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Stock.countDocuments(query)
        ]);

        return {
            stocks,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit)
        };
    } catch (error) {
        throw new Error(`Failed to fetch stocks: ${error.message}`);
    }
};

module.exports = {
    create_stock,
    update_stock,
    delete_stock,
    get_stock_details,
    get_all_stock
};