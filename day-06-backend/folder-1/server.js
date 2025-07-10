const express = require("express");
const connectToDB = require("./src/db/db.js");
const noteModel = require("./src/models/note.model.js");

// created server
const app = express();

// middleware : for reading req.body
app.use(express.json());

// connecting server to database
connectToDB();

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.json({
    msg: "Note fetch successfully!",
    notes,
  });
});

app.post("/notes", async (req, res) => {
  const { title, content } = req.body;

  console.log(title, content);

  await noteModel.create({
    title,
    content,
  });

  res.json({ msg: "Note created successfully!" });
});

app.patch("/notes/:id", async (req, res) => {
  const noteId = req.params.id;
  const { title, content } = req.body;
  const notes = await noteModel.findByIdAndUpdate(
    { _id: noteId },
    {
      title,
      content,
    }
  );

  res.json({ msg: "Note updated successfully!" });
});

app.delete("/notes/:id", async (req, res) => {
  const noteId = req.params.id;
  const notes = await noteModel.findByIdAndDelete({
    _id: noteId,
  });

  res.json({ msg: "Note deleted successfully!" });
});

// starting server
app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
