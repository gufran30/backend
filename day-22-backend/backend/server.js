require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("./src/service/ai.service");
const { text } = require("stream/consumers");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://http://localhost:5173/",
  },
});

// creating chat history for ai
const chatHistory = [];

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  /* ai-message --> event.*/
  /* firing event(ai-message) from CLIENT to SERVER */
  socket.on("ai-message", async (data) => {
    console.log("Recieved AI message:", data);

    chatHistory.push({
      role: "user",
      parts: [{ text: data }],
    });

    const response = await generateResponse(chatHistory);
    console.log("AI Response:", response);

    chatHistory.push({
      role: "model",
      parts: [{ text: response }],
    });

    /* ai-message-response --> event.*/
    /* firing event(ai-message-response) from SERVER to CLIENT */
    socket.emit("ai-message-response", response);
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
