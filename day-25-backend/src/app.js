require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth.route");
const indexRoutes = require("./routes/index.route");
const cookieParser = require("cookie-parser");

const app = express();
app.set("view engine", "ejs");
app.use(
  express.static("public")
); /* Serve static files form 'public' directory */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", indexRoutes);
app.use("/auth", authRoutes);

module.exports = app;
