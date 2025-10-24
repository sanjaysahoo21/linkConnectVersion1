const mongoose = require("mongoose");
module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log("Connected to DB");
    } catch (error) {
        console.log("Error connecting to DB:", error.message);
    }
}