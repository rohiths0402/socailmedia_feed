// src/components/UserProfile.js
import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="profile-container p-4 bg-white shadow-lg rounded">
      <h3 className="text-lg font-semibold">User Profile</h3>
      <div className="flex items-center space-x-4">
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p className="text-xl">{user?.username}</p>
          <p>{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
