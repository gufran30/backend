const express = require("express");
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.create({
    username,
    password,
  });
  // console.log(user);

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(201).json({
    msg: "user registered successfully",
    user,
    //token,
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

router.get("/user", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // res.send(decoded);
    const user = await userModel
      .findOne({
        _id: decoded.id,
      })
      .select("-password -__v");

    res.json({
      msg: "User data fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(401).json({
      msg: "Unauthorized - Invalid token",
      error,
    });
  }
});

module.exports = router;
