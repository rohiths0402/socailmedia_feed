// src/components/Auth.js
import React from "react";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const { loginWithGoogle, loading } = useAuth();

  return (
    <div className="auth-container">
      <button
        onClick={loginWithGoogle}
        className="bg-blue-500 text-white p-4 rounded"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login with Google"}
      </button>
    </div>
  );
};

export default Auth;
