const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("./jwtUtils");

function authenticationMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized: Missing JWT token" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid JWT token" });
    }

    req.user = decoded;
    next();
  });
}

module.exports = authenticationMiddleware;
