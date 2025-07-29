const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => console.log("Some error while connecting to db"));
}

module.exports = connectDB;
