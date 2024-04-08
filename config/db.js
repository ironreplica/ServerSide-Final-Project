const mongoose = require("mongoose");

// const dbPath = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    //await mongoose.connect(dbPath);

    console.log("Connected to DB Successfully.");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
