// src/components/Header.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Slice/userSlice";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const { logout: firebaseLogout } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = () => {
    firebaseLogout();
    dispatch(logout());
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl">Social Feed</h1>
      <div className="flex items-center space-x-4">
        <p>{user?.username}</p>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
