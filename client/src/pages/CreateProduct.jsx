import React, { useState } from "react";
import useProductsContext from "../hooks/useProductsContext";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [price, setPrice] = useState(0);
  const [priceError, setPriceError] = useState("");
  const [error, setError] = useState(null);

  const { products } = useProductsContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      description,
      price,
    };

    // check if product is unique before creating
    const isUnique = products.every(
      (product) => product.name !== newProduct.name
    );

    if (!isUnique) {
      setError("Product already exists");
      return;
    }

    let isValid = true;

    if (name.trim() === "") {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (description.trim() === "") {
      setDescriptionError("Description is required");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (price <= 0) {
      setPriceError("Price must be greater than 0");
      isValid = false;
    } else {
      setPriceError("");
    }

    if (!isValid) return;

    try {
      const response = await fetch("/api/products/save-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();

      if (data.success) {
        setName("");
        setDescription("");
        setPrice(0);
        setError(null);
        setNameError("");
        setDescriptionError("");
        setPriceError("");
        alert("Product created successfully");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Failed to create product", error);
      setError(error.message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold">Create Product</h1>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex flex-col space-y-2">
          <label className="text-lg" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded py-2 px-3 w-full"
          />
          {nameError && <p className="text-red-500">{nameError}</p>}

          <label className="text-lg" htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded py-2 px-3 w-full"
          />
          {descriptionError && (
            <p className="text-red-500">{descriptionError}</p>
          )}

          <label className="text-lg" htmlFor="price">
            Price:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded py-2 px-3 w-full"
          />
          {priceError && <p className="text-red-500">{priceError}</p>}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Create
          </button>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default CreateProduct;
