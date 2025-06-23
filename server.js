const app = require("./index");
const { connectDb } = require("./config/db");
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await connectDb();
        console.log(`Ecommerce API listening on PORT ${PORT}`);
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}).on('error', (err) => {
    console.error(`Failed to start server on PORT ${PORT}:`, err.message);
});
