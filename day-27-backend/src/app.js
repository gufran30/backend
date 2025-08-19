const cookieParser = require("cookie-parser");
const express = require("express");

/* Routes */
const authRoutes = require("./routes/auth.route");
const chatRoutes = require("./routes/chat.route");

/* Using Middlewares */
const app = express();
app.use(express.json());
app.use(cookieParser());

/* Using Routes */
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

module.exports = app;
