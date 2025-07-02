/*
* Creating server with Express 
*/

const express = require("express")
const app = express(); // server is created 

// app.get(path, callback);
app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.get("/home", (req, res) => {
  res.send("Welcome to the Home Page")
})

app.get("/about", (req, res) => {
  res.send("Welcome to the About Page")
})

// starting server
app.listen(3000, ()=> {
  console.log("Server made by express is running on 3000 port...")
})