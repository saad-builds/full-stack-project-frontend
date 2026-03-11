import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call your backend logout route
      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true } // ensures cookies are sent if you use them
      );

      // Remove JWT from localStorage
      localStorage.removeItem("token");

      alert("Logged out successfully!");
      navigate("/login"); // redirect to login page
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed. Try again.");
    }
  };

  return (
    <nav className="bg-zinc-800 border-b border-zinc-700 px-6 py-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-white font-bold text-xl">
          Dashboard
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link
          to="/add-products"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          Add Product
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;