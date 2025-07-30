const express = require("express");
const authRoutes = require("../src/routes/auth.routes");

const app = express();
app.use(express.json());

app.use("/auth", authRoutes); /* if auth related api */

module.exports = app;
