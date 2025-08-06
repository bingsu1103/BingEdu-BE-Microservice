const mongoose = require("mongoose");
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Submission connection successfully!");
  } catch (error) {
    console.log("Database Submission connection ERROR!");
    process.exit(1);
  }
};
module.exports = connection;
