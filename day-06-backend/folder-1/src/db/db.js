const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(
      "mongodb+srv://[user_name]:[user_pass]@cluster0.6eflc0l.mongodb.net/cohort"
    )
    .then(() => {
      console.log("Connected to DB");
    });
}

module.exports = connectToDB;
