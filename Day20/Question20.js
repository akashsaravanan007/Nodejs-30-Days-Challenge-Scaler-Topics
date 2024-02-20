const express = require("express");
const mongoose = require("mongoose");
const User = require("./User.js");

const app = express();

async function addUserWithValidation(user) {
  try {
    const newUser = new User(user);

    await newUser.save();
    console.log("User added successfully");
  } catch (error) {
    console.error("Error adding user:", error.message);
  }
}

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

app.get("/average-age", async (req, res) => {
  try {
    const averageAge = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: "$age" },
        },
      },
    ]);

    let avgAge;  

    if (averageAge.length === 0) {
      console.log("No users found");
      return res.status(404).json({ message: "No users found" });
    } else {
      avgAge = averageAge[0].averageAge;  
      console.log(`Average age of all users: ${avgAge}`);
    }

    res.json({ averageAge: avgAge });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello User! this is Task-20");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

addUserWithValidation({
  username: "johnAdam",
  email: "john@gmail.com",
  age: 25,
});
addUserWithValidation({ username: "Devon", email: "devon@gmail.com", age: 20 });
addUserWithValidation({ username: "Rehan", email: "rehan@gmail.com", age: 27 });
