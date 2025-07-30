const express = require("express");
const userModel = require("../model/user.model");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.create({
    username,
    password,
  });

  console.log(user);
  res.status(201).json({
    msg: "usser registered successfully",
    user,
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username: username,
  });

  if (!user) {
    return res.status(401).json({
      msg: "User account not founnd [invalid username]",
    });
  }
  const isPasswordValid = password == user.password;

  if (!isPasswordValid) {
    return res.status(401).json({
      msg: "Invalid password",
    });
  }

  res.status(200).json({
    msg: "User logged in Successfully",
  });
});

module.exports = router;
