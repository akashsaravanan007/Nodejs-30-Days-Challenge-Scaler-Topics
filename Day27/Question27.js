const express = require("express");
const authenticateAndAuthorize = require("./authMiddleware");

const app = express();

app.get("/admin/dashboard", authenticateAndAuthorize, (req, res) => {
  res.send("Welcome to admin dashboard!");
});
app.get("/", (req, res) => {
  res.send("Hello User! this is Task-27");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
