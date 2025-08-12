const express = require("express");
const indexRoute = require("./routes/index.route");

const app = express();
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoute);

module.exports = app;
