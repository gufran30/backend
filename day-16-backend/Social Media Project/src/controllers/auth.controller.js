const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
  const { username, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    username,
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      msg: "Username already exist, Please Login.",
    });
  }

  const user = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("Token", token);

  res.status(201).json({
    msg: "User Registered Successfully!",
    user,
  });
};

const loginController = async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username,
  });

  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  ); /* return true/false */

  if (!isPasswordValid) {
    return res.status(404).json({
      msg: "Password invalid",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("Token", token);

  res.status(200).json({
    msg: "User logged in successfully!",
    user,
  });
};

module.exports = {
  registerController,
  loginController,
};
