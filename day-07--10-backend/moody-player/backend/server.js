// import .env (environmental varible)
require("dotenv").config();

const app = require("./src/app");

// connecting to db
const connnectDB = require("./src/db/db");
connnectDB();

// starting server
app.listen(3000, () => {
  console.log("server is running on port: 3000");
});
