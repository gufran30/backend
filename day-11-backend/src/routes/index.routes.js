const express = require("express");

const router = express.Router();

router.use((req, res, next) => {
  console.log("this middleware is in b/w router and api");
  next();
});

router.get("/", (req, res) => {
  res.json({
    msg: "Welcome to the Home",
  });
});

module.exports = router;
