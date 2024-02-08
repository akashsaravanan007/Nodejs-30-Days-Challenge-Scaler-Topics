import express from "express";
const app = express();
const PORT = 3000;

function errorHandler(err, req, res, next) {
  if (err instanceof PositiveIntegerError) {
    res.status(400).json({ error: err.message });
  } else {
    next(err);
  }
}

class PositiveIntegerError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

function positiveIntegerHandler(req, res, next) {
  const number = parseInt(req.query.number);

  if (Number.isNaN(number) || number <= 0) {
    next(new PositiveIntegerError(`"${number}" must be a positive integer.`));
  } else {
    res.json({ message: "Success! " + number + " is a positive integer." });
  }
}

app.use(express.json());

app.get("/positive", positiveIntegerHandler);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello User! this is Task-8");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
