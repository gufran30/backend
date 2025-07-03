// importing Express
const express = require("express");

// creating server
const app = express();

// using middleware : to show console.log(req.body) in notes api. (because express cannot read directly req.body)
app.use(express.json())

let notes = [];

app.post("/notes", (req, res) => {
  console.log(req.body);
  notes.push(req.body);
  res.json({
    message: "Note added successfully",
    notes: notes,
  });
});

// starting server
app.listen(3000, () => {
  console.log("Server is running on 3000 port");
});
