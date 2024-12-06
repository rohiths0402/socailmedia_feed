// src/components/Header.js
import React from "react";

import { useSelector } from "react-redux";

const Header = () => {
  const { displayName } = useSelector((state) => state.user);
  console.log("User from Redux:", displayName);

  return (
    <header className="bg-white shadow p-4 rounded-lg mb-4 flex items-center">
      <img
        src="https://via.placeholder.com/40"
        alt="Profile"
        className="w-10 h-10 rounded-full mr-3"
      />
      <div>
        <h1 className="font-semibold text-lg">Welcome Back,</h1>
        <p className="text-sm text-gray-500">{displayName}</p>
      </div>
    </header>
  );
};

export default Header;
