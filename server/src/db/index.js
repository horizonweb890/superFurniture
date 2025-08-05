const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect("mongodb+srv://horizonweb27:6U5IOHF7VSly4UTo@cluster0.atualef.mongodb.net/");
    console.log(`\nMongoDB connected: ${connectionInstance.connection.host}`);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);  // Exit the process if the connection fails
  }
};

module.exports = connectDB;
