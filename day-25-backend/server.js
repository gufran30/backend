const app = require("./src/app");
const http = require("http");
const connectDB = require("./src/db/db");
const setupSocketServer = require("./src/socket/socket.server");

const httpServer = http.createServer(app);

setupSocketServer(httpServer);
connectDB();

httpServer.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
