import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Productform = () => {
  const navigate = useNavigate();

  const [productname, setProductName] = useState("");
  const [productprice, setProductPrice] = useState("");
  const [productquantity, setProductQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      Name: productname,
      Price: productprice,
      Quantity: productquantity,
    };

    const apiUrl = `${process.env.REACT_APP_API_URL}/add`;

    try {
      await axios.post(apiUrl, productData);

      alert("Product added successfully!");

      setProductName("");
      setProductPrice("");
      setProductQuantity("");

      navigate("/");
    } catch (error) {
      console.log(error);
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
          <h2 className="text-3xl font-semibold">Add New Product</h2>
          <p className="text-zinc-400 text-sm mt-1">
            Fill the form below to add a new product
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
              className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-md font-medium"
            >
              Add Product
            </button>

          </form>

        </div>

      </main>

    </div>
  );
};

export default Productform;