require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

// connect to mongoDB
connectDB();

app.listen(3000, () => {
  console.log("Server is runing on Port 3000");
});
