import React, { useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const { displayName, photoURL } = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState("Friends");

  return (
    <div className="bg-white-100  text-black  p-4 flex justify-between  ">
      <div className=" ">
        {/* Profile Image */}
        <div className="absolute top-5 right-0 w-20">
          <a href="/profile">
            <img
              src="https://via.placeholder.com/40?text=User"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </a>
        </div>

        <div className="relative top-20 left-3">
          <h1 className="text-2xl font-bold mr-12">Feeds</h1>
        </div>

        {/* Right Side: Profile Icon and Tabs */}

        {/* Tab buttons */}
        <div className="absolute top-24 bg-gray-100 rounded-xl right-3 ">
          {["Recent", "Friends", "Popular"].map((tab) => (
            <button
              key={tab}
              className={`text-sm font-medium py-1 px-4 rounded-full ${
                activeTab === tab
                  ? "bg-gray-800 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
