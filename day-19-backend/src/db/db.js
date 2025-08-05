const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to db");
    })
    .catch((err) => {
      console.log("---------> some error while connecting to db:", err);
    });
};

module.exports = connectDB;
