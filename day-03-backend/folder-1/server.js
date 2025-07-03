// import express
const express = require("express")

// creating server...
const app = express();

// creating api
app.get("/home", (req, res) => {
  res.send("Currenty We are on Home Page.")
})

app.get("/about", (req, res) => {
  res.send("Currently We are on About Page")
})

// starting server...
app.listen(3000, () => {
  console.log("Server is running on 3000...")
})