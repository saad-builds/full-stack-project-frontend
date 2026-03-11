import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

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

      // Update UI instantly
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
    <div className="min-h-screen bg-zinc-900 text-zinc-100 px-6 py-10">
      {/* Header */}
      {/* <Navbar /> */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <div className="flex gap-4">
          <Link
            to="/add-products"
            className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg transition cursor-pointer"
          >
            + Add Product
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
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
                <td
                  colSpan="4"
                  className="px-6 py-10 text-center text-zinc-400"
                >
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
                        className="bg-red-600 hover:bg-red-500 px-4 py-1 rounded-md text-sm"
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
    </div>
  );
};

export default AllProducts;
