import express from "express";
import mongoose from "mongoose";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello User! this is Task-16");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function connectToMongoDB() {
  const mongoURI = "mongodb://127.0.0.1:27017/scalerDB";

  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.once("open", () => {
    console.log("Connected to MongoDB successfully!");
  });

  db.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
}

connectToMongoDB();
