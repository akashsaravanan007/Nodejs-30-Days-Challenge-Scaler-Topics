const express = require("express");
const mongoose = require("mongoose");
const User = require("./User.js");

const app = express();
const PORT = 3000;

mongoose
  .connect("mongodb://localhost:27017/Task17", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function getAllUsers(req, res) {
  try {
    const users = await User.find({}).exec();
    res.json(users);
  } catch (err) {
    console.error("Error retrieving users:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

app.get("/", (req, res) => {
  res.send("Hello User! this is Task-18");
});

app.get("/users", getAllUsers);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
