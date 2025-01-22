import React, { useEffect } from "react";
import useProductsContext from "../hooks/useProductsContext";
import { Link } from "react-router-dom";
import CreateProduct from "../pages/CreateProduct.jsx";

const Dashboard = () => {
  const { products, fetchProducts, deleteProduct, deleteAllProducts } =
    useProductsContext();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div className="flex h-screen bg-gray-100 items-center justify-center gap-10">
      <div className="bg-white rounded-lg shadow-md p-4 w-1/2">
        <h1 className="text-3xl font-bold">Product List</h1>
        {products.length > 0 && (
          <button
            onClick={deleteAllProducts}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Delete All
          </button>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 mt-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold truncate">{product.name}</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                  <Link to={`/update-product/${product._id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Update
                    </button>
                  </Link>
                </div>
              </div>
              <p className="mt-2">{product.description}</p>
              <p className="mt-2">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
      <CreateProduct />
    </div>
  );
};

export default Dashboard;
