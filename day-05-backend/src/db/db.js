const mongoose = require("mongoose")

// How database will connect with server. this logic will writtern in db.js (here)

function connectToDB() {

  mongoose.connect("mongodb+srv://[user_name]:[password]@cluster0.6eflc0l.mongodb.net/cohort").then(() => {
    console.log("connected to DB")
  })
}

module.exports = connectToDB;