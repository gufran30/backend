const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  // console.log("----Retrieve cookies from cookies.token--->", token);

  if (!token) {
    // return res.status(401).json({ msg: "Unauthorized" });
    return res.redirect("/auth/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("----try block authMiddleware-----decoded----->", decoded);

    const user = await userModel.findById(decoded.id);
    // console.log("---------user-----authMiddleware----->", user);
    req.user = user;
    // console.log("---------req.user-----authMiddleware----->", req.user);

    next();
  } catch (err) {
    res.status(201).json({ msg: "Invalid token" });
  }
}

module.exports = { authUser };
