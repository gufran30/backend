const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authUser(req, res, next) {
  const { UserToken } = req.cookies;
  console.log("------ req.cookies-------->", req.cookies);

  if (!UserToken) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(UserToken, process.env.JWT_SECRET);
    console.log("------ decoded -------->", decoded);

    const user = await userModel.findById(decoded.id);
    console.log("------ user -------->", user);

    req.user = user;
    /*req.user = user, It’s a way to pass the authenticated user’s info forward into the request lifecycle. */

    next();
  } catch (error) {
    res.status(401).json({ msg: "Unauthorized" });
  }
}

module.exports = authUser;
