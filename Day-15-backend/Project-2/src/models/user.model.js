const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true /* Mongoose Schema level Validation */,
    required: true,
  },
  password: {
    type: String,
  },
});

const userModel = mongoose.model("InstaUser", userSchema);

module.exports = userModel;
