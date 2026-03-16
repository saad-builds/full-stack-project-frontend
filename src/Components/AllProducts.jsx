import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const showProducts = async () => {
    const token = localStorage.getItem("token");
    const apiUrl = `${import.meta.env.VITE_API_URL}/get-products`;

    axios
      .get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProducts(res.data.products || []))
      .catch((err) => {
        if (err.response?.status === 401) {
          console.log("Unauthorized. Redirecting to login...");
          navigate("/login");
        } else {
          console.log(err);
        }
      });
  };

  useEffect(() => {
    showProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/delete-product/${id}`;
      await axios.delete(apiUrl);
      alert("Data Deleted.");
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 px-4 py-8 sm:px-6 sm:py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">All Products</h1>
        <div className="flex gap-3">
          <Link
            to="/add-products"
            className="flex-1 sm:flex-none text-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition cursor-pointer text-sm sm:text-base"
          >
            + Add Product
          </Link>
          <button
            onClick={handleLogout}
            className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition cursor-pointer text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Desktop Table — hidden on mobile */}
      <div className="hidden sm:block max-w-6xl mx-auto bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-700 text-zinc-200">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Quantity</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-10 text-center text-zinc-400">
                  No products yet. Click "+ Add Product" to add one.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t border-zinc-700 hover:bg-zinc-700/40 transition"
                >
                  <td className="px-6 py-4">{product.Name}</td>
                  <td className="px-6 py-4">Rs. {product.Price}</td>
                  <td className="px-6 py-4">{product.Quantity}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/update-product/${product._id}`}
                        className="bg-emerald-600 hover:bg-emerald-500 px-4 py-1 rounded-md text-sm"
                      >
                        Update
                      </Link>
                      <Link
                        className="bg-red-600 hover:bg-red-500 px-4 py-1 rounded-md text-sm cursor-pointer"
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards — shown only on mobile */}
      <div className="sm:hidden max-w-6xl mx-auto flex flex-col gap-4">
        {products.length === 0 ? (
          <div className="bg-zinc-800 rounded-lg px-6 py-10 text-center text-zinc-400">
            No products yet. Click "+ Add Product" to add one.
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-zinc-800 rounded-lg p-4 flex flex-col gap-3 shadow-md"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold">{product.Name}</h2>
                <span className="text-sm text-zinc-400">Qty: {product.Quantity}</span>
              </div>
              <p className="text-blue-400 font-medium">Rs. {product.Price}</p>
              <div className="flex gap-3 mt-1">
                <Link
                  to={`/update-product/${product._id}`}
                  className="flex-1 text-center bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-md text-sm transition"
                >
                  Update
                </Link>
                <button
                  className="flex-1 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-md text-sm transition cursor-pointer"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllProducts;