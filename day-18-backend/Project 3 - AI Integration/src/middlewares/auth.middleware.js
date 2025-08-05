const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      msg: "Unauthorized Access, Please Login first",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ); /* if wrong token, will throw error */

    const user = await userModel.findOne({
      _id: decoded.id,
    });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid token, Please Login again",
    });
  }
};

module.exports = authMiddleware;
