const mongoose = require("mongoose");
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Auth connection successfully!");
  } catch (error) {
    console.log("Database Auth connection ERROR!");
    process.exit(1);
  }
};
module.exports = connection;
