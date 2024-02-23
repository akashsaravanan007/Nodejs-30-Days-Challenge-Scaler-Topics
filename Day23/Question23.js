const express = require("express");
const mongoose = require("mongoose");

const app = express();

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Category = mongoose.model("Category", categorySchema);
const ProductWithCategory = mongoose.model(
  "ProductWithCategory",
  productSchema
);

async function getProductsPopulatedWithCategory() {
  try {
    const products = await ProductWithCategory.find()
      .populate("category")
      .exec();
    return products;
  } catch (error) {
    console.error("Error fetching products with populated category:", error);
    throw error;
  }
}

async function test() {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/Task23", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error("MongoDB connection error:", err));

    const category1 = await Category.create({
      name: "Electronics",
      description: "Electronic gadgets",
    });
    const category2 = await Category.create({
      name: "Clothing",
      description: "Clothing items",
    });
    const category3 = await Category.create({
      name: "Furnitures",
      description: "Furniture items",
    });

    await ProductWithCategory.create({
      name: "Television",
      price: 20000,
      category: category1._id,
    });
    await ProductWithCategory.create({
      name: "Hoodie",
      price: 2000,
      category: category2._id,
    });
    await ProductWithCategory.create({
      name: "Sofa Set",
      price: 10000,
      category: category3._id,
    });

    const products = await getProductsPopulatedWithCategory();
    console.log(products);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.disconnect();
  }
}

app.get("/", (req, res) => {
  res.send("Hello User! this is Task-23");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

test();
