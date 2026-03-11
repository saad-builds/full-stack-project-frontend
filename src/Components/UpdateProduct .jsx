import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productname, setProductName] = useState("");
  const [productprice, setProductPrice] = useState("");
  const [productquantity, setProductQuantity] = useState("");

  const getSingleProduct = async (token) => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/get-single-product/${id}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductName(response.data.getSingleProduct.Name);
      setProductPrice(response.data.getSingleProduct.Price);
      setProductQuantity(response.data.getSingleProduct.Quantity);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        alert("Unauthorized. Please login again.");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      getSingleProduct(token);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      Name: productname,
      Price: productprice,
      Quantity: productquantity,
    };

    const apiUrl = `${import.meta.env.VITE_API_URL}/update-product/${id}`;
    const token = localStorage.getItem("token");

    try {
      await axios.put(apiUrl, productData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Product updated successfully!");

      setProductName("");
      setProductPrice("");
      setProductQuantity("");

      navigate("/"); 
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        alert("Unauthorized. Please login again.");
        navigate("/login");
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      {/* Header */}
      <header className="bg-zinc-800 border-b border-zinc-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Product Management</h1>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold">Update Product</h2>
          <p className="text-zinc-400 text-sm mt-1">
            Fill the form below to update a product
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-zinc-800 p-8 rounded-lg shadow-md max-w-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Product Name */}
            <div>
              <label className="block mb-2 text-sm text-zinc-300">
                Product Name
              </label>
              <input
                type="text"
                value={productname}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Product Price */}
            <div>
              <label className="block mb-2 text-sm text-zinc-300">
                Product Price
              </label>
              <input
                type="number"
                value={productprice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="Enter product price"
                className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Product Quantity */}
            <div>
              <label className="block mb-2 text-sm text-zinc-300">
                Product Quantity
              </label>
              <input
                type="number"
                value={productquantity}
                onChange={(e) => setProductQuantity(e.target.value)}
                placeholder="Enter product quantity"
                className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-md font-medium cursor-pointer"
            >
              Update Product
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UpdateProduct;
