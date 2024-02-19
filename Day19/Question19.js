const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,

    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
});

mongoose
  .connect(
    "mongodb://localhost:27017/Task17",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const User = mongoose.model("User", userSchema);

async function addUserWithValidation(user) {
  try {
    const newUser = new User(user);

    await newUser.save();
    console.log("User added successfully");
  } catch (error) {
    console.error("Error adding user:", error.message);
  }
}

app.get("/", (req, res) => {
  res.send("Hello User! this is Task-19");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

addUserWithValidation({ username: "johnAdam", email: "john@gmail.com" });
addUserWithValidation({ username: "johnAdam", email: "john$gmail.com" });
