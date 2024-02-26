const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;
const mongoURI = "mongodb://localhost:27017";
const DB_NAME = "Task26";

async function getProductStatistics() {
  try {
    const client = new MongoClient(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();

    console.log("MongoDB Connected Successfully!");

    const pipeline = [
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: "$price" },
          highestQuantity: { $max: "$quantity" },
        },
      },
    ];

    const result = await client
      .db(DB_NAME)
      .collection("products")
      .aggregate(pipeline)
      .toArray();

    if (result.length === 1) {
      const statistics = result[0];
      await client
        .db(DB_NAME)
        .collection("product_statistics")
        .insertOne(statistics);

      console.log("Product Statistics:");
      console.log(statistics);
      return statistics;
    } else {
      throw new Error("Failed to retrieve product statistics");
    }
  } catch (error) {
    console.error("Error retrieving product statistics:", error);
    throw error;
  }
}

async function insertSampleProducts() {
  try {
    const client = new MongoClient(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();

    const sampleProducts = [
      { name: "Product 1", price: 10, quantity: 20 },
      { name: "Product 2", price: 15, quantity: 25 },
      { name: "Product 3", price: 20, quantity: 30 },
      { name: "Product 4", price: 25, quantity: 35 },
      { name: "Product 5", price: 30, quantity: 40 },
    ];

    await client.db(DB_NAME).collection("products").insertMany(sampleProducts);
    console.log("Sample products inserted successfully.");
  } catch (error) {
    console.error("Error inserting sample products:", error);
    throw error;
  }
}

async function listAllProducts() {
  try {
    const client = new MongoClient(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();

    const products = await client
      .db(DB_NAME)
      .collection("products")
      .find()
      .toArray();
    console.log("All Products:");
    console.log(products);
  } catch (error) {
    console.error("Error listing all products:", error);
    throw error;
  }
}

app.get("/product-statistics", async (req, res) => {
  try {
    const statistics = await getProductStatistics();
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve product statistics" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello User! this is Task-26");
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await insertSampleProducts();
  await listAllProducts();
});
