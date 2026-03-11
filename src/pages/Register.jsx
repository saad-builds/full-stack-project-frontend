import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

      if (!username || !email || !password) {
        alert("All fields are required");
        return;
      }

    const usertData = {
      username: username,
      email: email,
      password: password,
    };

    const apiUrl = `${import.meta.env.VITE_API_URL}/register`;

    try {
      await axios.post(apiUrl, usertData);

      alert("User registered successfully!");

      setUserName("");
      setEmail("");
      setPassword("");

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
          <h1 className="text-2xl font-bold">User Registration</h1>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold">Register New User</h2>
          <p className="text-zinc-400 text-sm mt-1">
            Fill the form below to register a new user
          </p>
        </div>

        <div className="bg-zinc-800 p-8 rounded-lg shadow-md max-w-xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* User Name */}
            <div>
              <label className="block mb-2 text-sm text-zinc-300">
                User Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter user name"
                className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm text-zinc-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm text-zinc-300">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-md font-medium cursor-pointer"
            >
              Register User
            </button>
          </form>

          {/* Register link */}
          <p className="text-zinc-400 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline ">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};
export default Register;
