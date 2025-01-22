import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(process.env.PORT, () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("Mongodb connected"))
      .catch((error) => console.log(error));
    console.log("Server running at port", process.env.PORT);
  } catch (error) {
    console.log(error.message);
  }
});
