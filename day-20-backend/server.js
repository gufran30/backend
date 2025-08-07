const express = require("express");
const { createServer } = require("http");
const { join } = require("path");
const { Server } = require("socket.io");

const app = express();
app.use(express.static(join(__dirname, "public")));

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("msg :", msg);
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
