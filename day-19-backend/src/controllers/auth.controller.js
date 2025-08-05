const userModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
      username,
    });

    if (isUserAlreadyExist) {
      return res.status(409).json({
        msg: "User already registerd, Please Login.",
      });
    }

    const user = await userModel.create({
      username,
      password: await bcrypt.hash(password, 10),
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log("----------- line 23 ----------------> TOKEN :", token);

    res.cookie("token", token);

    res.status(201).json({
      msg: "User Account is created!",
      user,
    });
  } catch (error) {
    console.log("Ooops.. ERROR in registerController:", error);
  }
};

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({
      username,
    });
    console.log("-----------------> user:", user);

    if (!user) {
      return res.status(404).json({
        msg: "Username not exist",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log("-----------------> isValidPassword:", isValidPassword);

    if (!isValidPassword) {
      return res.status(401).json({
        msg: "password is invalid, try again",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);

    res.status(200).json({
      msg: "User logged in successfully!",
      user,
    });
  } catch (error) {
    console.log("Ooops... ERROR in loginController:", error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
