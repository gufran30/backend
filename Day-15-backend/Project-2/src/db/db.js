const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log("some error occured while connecting to db", err);
    });
};

module.exports = connectDB;
