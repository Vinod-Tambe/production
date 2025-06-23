const mongoose = require("mongoose"); 
require('dotenv').config();
  const DBURL= process.env.DBURL;
const connectDb = async() => {
    const conn=await mongoose.connect(DBURL)
    .then(() => {
      console.log('Database connected successfully');
    })
    .catch((err) => {
      console.error('MongoDB connection error');
    });
  return conn;
};



module.exports = { connectDb };