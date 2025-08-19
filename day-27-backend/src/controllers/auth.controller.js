const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const {
      fullName: { firstName, lastName },
      email,
      password,
    } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
      return res.status(409).json({
        msg: "User already Exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log("---------- hashPassword ------->", hashPassword);

    // saving in DB
    const user = await userModel.create({
      fullName: {
        firstName,
        lastName,
      },
      email,
      password: hashPassword,
    });
    console.log("---------- user ------->", user);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log("---------- token ------->", token);

    res.cookie("UserToken", token);

    res.status(200).json({
      msg: "User registered successfully",
      user: {
        email: user.email,
        _id: user._id,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.log("--------Error occurred in registerUser ------------>", error);
    res.status(500).json({ msg: "Server error", error });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    console.log("---------- user ------->", user);

    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    // ✅ await here
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log("---------- token ------->", token);

    res.cookie("UserToken", token); // ⚠️ avoid spaces in cookie name

    res.status(200).json({
      msg: "User Login successfully",
      user: {
        email: user.email,
        _id: user._id,
        fullName: user.fullName,
        // ❌ never send password back in real apps
      },
    });
  } catch (error) {
    console.log("--------Error occurred in loginUser ------------>", error);
    res.status(500).json({ msg: "Server error", error });
  }
}


module.exports = { registerUser, loginUser };
