const express = require("express");
const connectToDB = require("./src/db/db.js")


// calling connection function which will establish connection b/w server & database (mongodb).
connectToDB();
const app = express();
app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
  const { title, content } = req.body;
  console.log(title, content);
});

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(3000, () => {
  console.log("Server is running on PORT: 3000");
});
