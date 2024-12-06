// src/pages/Login/LoginModal.js
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginWithEmailPassword, login, error } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        await loginWithEmailPassword(email, password);
        navigate("/");
        onClose();
      } catch (err) {
        console.error("Login failed:", err.message);
      }
    } else {
      await login();

      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full shadow-xl">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Show error message */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-400 transition duration-200"
          >
            Login
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full text-gray-600 hover:text-gray-800 font-semibold py-2 px-4 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
