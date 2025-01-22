import Product from "../models/product.model.js";

// get all products (find method)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get product by id (findById method)
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create a new product (save method)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete a product (findByIdAndDelete method)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete all products (deleteMany method)
export const deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});

    res.status(200).json({ message: "All products deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a product (findByIdAndUpdate method)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// {
//   "name": "Apple iPhone 13",
//   "description":
//     "The Apple iPhone 13 is a line of smartphones designed and marketed by Apple Inc. The phone features a 6.1-inch touchscreen display, 12-megapixel camera, and water resistance.",
//   "price": 999,
//   "category": "electronics",
//   "image":
//     "https://res.cloudinary.com/duqwhjqlf/image/upload/v1646425550/iphone-13_tq9q6v.jpg",
//   "brand": "Apple",
//   "rating": 4.5,
//   "numReviews": 12,
//   "countInStock": 10
// }
