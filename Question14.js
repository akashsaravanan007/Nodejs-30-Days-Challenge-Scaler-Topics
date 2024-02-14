const cache = {};

/**
 * Caching middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function cachingMiddleware(req, res, next) {
  const key = req.originalUrl;

  if (cache[key]) {
    const { data, expiry } = cache[key];
    if (expiry > Date.now()) {
      console.log(`Cache hit for ${key}`);
      return res.send(data);
    }
    console.log(`Cache expired for ${key}`);
  }

  const originalSend = res.send;
  res.send = function (data) {
    cache[key] = { data, expiry: Date.now() + 60000 };
    originalSend.call(this, data);
  };

  next();
}

import express from "express";
const app = express();

app.use(cachingMiddleware);

app.get("/", (req, res) => {
  res.send("Hello User! this is Task-14");
});

app.get("/test", (req, res) => {
  res.send("This is a cached response");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
