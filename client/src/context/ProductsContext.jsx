import { createContext, useState } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products/all-products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`/api/products/delete-product/${id}`, { method: "DELETE" });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  const deleteAllProducts = async () => {
    try {
      await fetch("/api/products/delete-all-products", { method: "DELETE" });
      setProducts([]); // Clear the products state
    } catch (error) {
      console.error("Failed to delete all products", error);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      await fetch(`/api/products/update-product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      const updatedProducts = products.map((product) =>
        product._id === id ? { ...product, ...updatedProduct } : product
      );
      setProducts(updatedProducts);
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        fetchProducts,
        deleteProduct,
        updateProduct,
        deleteAllProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
