import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
  deleteAllProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/all-products", getAllProducts);
router.get("/get-product/:id", getProductById);
router.post("/save-product", createProduct);
router.delete("/delete-product/:id", deleteProduct);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-all-products/", deleteAllProducts);

export default router;
