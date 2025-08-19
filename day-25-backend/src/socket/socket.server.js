const { Server } = require("socket.io");
const aiService = require("../services/ai.service");

function setupSocketServer(httpServer) {
  const io = new Server(httpServer, {});

  io.on("connection", (socket) => {
    console.log("---------> A user connected");

    socket.on("ai-message", async (msg) => {
      // console.log(msg);
      const result = await aiService.generateContent(msg);
      console.log(result);

      socket.emit('ai-message-response', result)
    });

    socket.on("disconnect", () => {
      console.log("----------------> A user disconnected");
    });
  });
}

module.exports = setupSocketServer;
