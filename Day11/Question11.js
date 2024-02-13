const express = require("express");
const { generateToken } = require("./jwtUtils");
const authenticationMiddleware = require("./authMiddleware");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello User! this is Task-11");
});

app.post("/login", (req, res) => {
  const user = { id: 1, username: "example_user" };
  const token = generateToken(user);
  res.json({ token });
});

app.get("/protected", authenticationMiddleware, (req, res) => {
  res.json({ message: "This is a protected route!", user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
