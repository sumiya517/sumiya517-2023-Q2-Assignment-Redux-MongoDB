const mongoose = require('mongoose');

// database connection with mongoose
const databaseConnection = async (callback) => {
    try {
        const client = await mongoose.connect(process.env.DATABASE_URI);
        if (client) console.log("Database connection is successful!")
        callback();
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = databaseConnection