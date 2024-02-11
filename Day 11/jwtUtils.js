const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = "xhdfndndg";

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" });
}

module.exports = { generateToken };
