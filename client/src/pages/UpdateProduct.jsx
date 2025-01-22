import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductsContext from "../hooks/useProductsContext";

const UpdateProduct = () => {
  const { id } = useParams();
  const { products, fetchProducts, updateProduct } = useProductsContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const product = products.find((product) => product._id === id);
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
    }
  }, [id, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      description,
      price,
    };

    await updateProduct(id, updatedProduct);

    fetchProducts();
  };

  return (
    <div className="flex h-screen bg-gray-100 items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-4 w-1/2">
        <h1 className="text-3xl font-bold">Update Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border rounded p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
