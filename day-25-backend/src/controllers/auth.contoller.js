const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getRegisterController = async (req, res) => {
  res.render("register");
};

const postRegisterController = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const isUserExist = await userModel.findOne({
      $or: [{ username: username }, { email: email }],
    });
    console.log(" ----------- isUserExist -------------->", isUserExist);

    if (isUserExist) {
      return res.status(400).json({
        message: "User already exist with given email or username",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username: username,
      email: email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    res.cookie("token", token);

    return res.status(201).json({
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(
      "-------- Some error occured in postRegisterController ------>",
      error
    );
  }
};

const getLoginController = async (req, res) => {
  res.render("login");
};

const postLoginController = async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  const user = await userModel.findOne({
    email: email,
  });
  // console.log(" ----------- user -------------->", user);

  if (!user) {
    return res.redirect("/login?error=User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.redirect("/login?error=Invalid password");
  }

  console.log(user._id);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

  res.cookie("token", token);

  // res.status(200).json({
  //   message: "User logged in successfully",
  //   user,
  // });
  res.redirect("/");
};

const userLogout = async (req, res) => {
  res.clearCookie("token");
  return res.redirect("/auth/login");
};

module.exports = {
  getRegisterController,
  postRegisterController,
  getLoginController,
  postLoginController,
  userLogout,
};
