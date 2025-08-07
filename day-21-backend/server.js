require("dotenv").config();
const app = require("./src/app");

const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("./src/service/ai.service");

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("ai-message", async (data) => {
    console.log("Recieved ai message:", data);
    const response = await generateResponse(data);
    console.log("AI Response:", response);
    socket.emit("ai-message-response", { response });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
