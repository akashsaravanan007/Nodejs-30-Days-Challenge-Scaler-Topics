const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello User! this is Task-22");
});

mongoose
  .connect("mongodb://localhost:27017/Task22", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const Product = mongoose.model("Product", productSchema);

async function createProduct(product) {
  try {
    const newProduct = new Product(product);
    await newProduct.save();
    console.log("Product created successfully:", newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
  }
}

async function getAllProducts() {
  try {
    const products = await Product.find();
    console.log("All products:", products);
    return products;
  } catch (error) {
    console.error("Error getting products:", error);
    return [];
  }
}

async function updateProduct(productId, updatedProduct) {
  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
    });
    console.log("Product updated successfully:", product);
  } catch (error) {
    console.error("Error updating product:", error);
  }
}

async function deleteProduct(productId) {
  try {
    await Product.findByIdAndDelete(productId);
    console.log("Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}

async function test() {
  await createProduct({ name: "Product 1", price: 10, quantity: 100 });
  await createProduct({ name: "Product 2", price: 20, quantity: 200 });
  await createProduct({ name: "Product 3", price: 30, quantity: 300 });

  const products = await getAllProducts();
  if (products.length > 0) {
    const productId = products[0]._id;
    await updateProduct(productId, { price: 15 });

    await deleteProduct(productId);
  }
}

test();
