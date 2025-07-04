const express = require("express");

// creating the server
const app = express();

// programming the server
app.get("/", (req, res) => {
  res.send("Hello Home!");
});

// using middleware to see req.body in console.log()
// because if you don't use this, you will see undefined in console
app.use(express.json());

let notes = [];

// creating notes api using POST method
/* /notes => {title, description} */
app.post("/notes", (req, res) => {
  // console.log(req.body);
  notes.push(req.body);
  res.json({message : "Note added successfully"})
});

// showing the note using GET method
app.get("/notes", (req, res) => {
  res.json(notes);
});


// Deleting one note from notes using index or params
/* DELETE /notes/:0 */
app.delete("/notes/:idx", (req, res) => {
  const index = req.params.idx
  delete notes[index]
  res.json({message: "note deleted successfully"})
})

// updating note 
/* PATCH /notes/:index => {title} */
app.patch("/notes/:index", (req, res) => {
  const index = req.params.index
  const {title} = req.body;
  console.log(title)
  notes[index].title = title;
  res.json({message: "Note updated successfully."})
})

// starting the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
