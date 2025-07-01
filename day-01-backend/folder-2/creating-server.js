/*
  const http = require("http");
  const server = http.createServer(); // server is created

  // to start server
  server.listen(3000, () => {
    console.log("server is running on port 3000");
  });

    // if you go on browser and search localhost:3000
    //   - you will see on your tab still loadding, not showing any response.

    //   - this is because you haven't programmed server yet.
*/

const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Hello world from the server..."); // send response
}); // server is created

// starting server...
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
