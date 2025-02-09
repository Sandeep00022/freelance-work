import React, { useState } from "react";
import apiClient from "../utils/clientApi";
import { Link, useNavigate } from "react-router-dom"; // Added `useNavigate`
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate(); // React Router navigation instead of page refresh

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);
      dispatch(signInStart());

      const response = await apiClient.post("/user/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.data || !response.data.token) {
        throw new Error("Invalid server response");
      }

      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      dispatch(signInSuccess(user));
      // return 
      console.log("here", response)
      navigate("/"); // Redirect to home instead of refreshing
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Invalid credentials!";
      setError(errorMessage);
      dispatch(signInFailure(errorMessage));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Log In
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          Log in to your account
        </p>

        {error && (
          <div className="text-sm text-red-500 text-center mt-4">{error}</div>
        )}

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white ${
              loading ? "bg-gray-400" : "bg-blue-500"
            } rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
