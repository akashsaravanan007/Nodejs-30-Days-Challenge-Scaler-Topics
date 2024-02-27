const jwt = require("jsonwebtoken");

const users = [
  { id: 1, username: "admin", password: "admin123", role: "admin" },
  { id: 2, username: "user", password: "user123", role: "user" },
];

const secretKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

function authenticateAndAuthorize(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;

    const user = users.find((u) => u.id === decoded.id);
    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Not authorized." });
    }

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
}

module.exports = authenticateAndAuthorize;
