const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to DB");
  } catch (error) {
    console.log("ERROR while connecting to DB ---------------> ", error);
  }
}

module.exports = connectDB;
