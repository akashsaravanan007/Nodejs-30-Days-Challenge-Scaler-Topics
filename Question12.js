import express from "express";
const app = express();

const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60000;
const requestCounts = {};

function rateLimitMiddleware(req, res, next) {
  const ip = req.ip;

  if (!requestCounts[ip]) {
    requestCounts[ip] = {
      count: 1,
      timestamp: Date.now(),
    };
  } else {
    const now = Date.now();
    const windowStart = requestCounts[ip].timestamp;

    if (now - windowStart < RATE_LIMIT_WINDOW) {
      requestCounts[ip].count++;
    } else {
      requestCounts[ip] = {
        count: 1,
        timestamp: now,
      };
    }
  }

  if (requestCounts[ip].count > RATE_LIMIT) {
    return res.status(429).send("Too Many Requests");
  }

  next();
}

app.use(rateLimitMiddleware);

app.get("/", (req, res) => {
  res.send("Hello User! this is Task-12");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
