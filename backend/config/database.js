const mongoose = require('mongoose');
require('dotenv').config(); // load env

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed", error.message);
        process.exit(1); // exit
    }
};

module.exports = connectDB;
