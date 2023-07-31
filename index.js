const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const algoliasearch = require("algoliasearch");

// Algolia client initialization
const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);
const algoliaIndex = algoliaClient.initIndex("products");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

// Example route to synchronize MongoDB data with Algolia
app.get("/api/products", async (req, res) => {
  try {
    // Retrieve the data from your MongoDB model (e.g., Product)
    const products = await Product.find().lean().exec();

    // Map and format the data for Algolia indexing
    const objectsToIndex = products.map((product) => ({
      objectID: product._id.toString(),
      title: product.title,
      desc: product.desc,
      // Add more attributes based on your product model
    }));

    // Save objects to the Algolia index
    await algoliaIndex.saveObjects(objectsToIndex);

    res.status(200).json({ message: "Data synchronized with Algolia" });
  } catch (error) {
    console.error("Error synchronizing data with Algolia:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
