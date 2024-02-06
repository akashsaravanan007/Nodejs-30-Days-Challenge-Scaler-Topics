import express from "express";
const app = express();

/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function greetHandler(req, res) {
  const { name } = req.query;

  if (name) {
    res.send(`Hello, ${name}!`);
  } else {
    res.send("Hello, Guest!");
  }
}

app.get("/greet", greetHandler);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
