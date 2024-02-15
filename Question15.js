import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Logging middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function loggingMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body);

  next();
}

app.use(loggingMiddleware);

app.get("/", (req, res) => {
  res.send("Hello User! this is Task-15");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
