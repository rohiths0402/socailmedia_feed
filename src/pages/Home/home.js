import React from "react";
import Header from "../../components/Header";
import Feed from "../../components/Feed";

const Home = () => {
  const posts = [];

  return (
    <div>
      <Header />
      <div className="bg-white-100 min-h-screen p-4">
        <Feed />
        <button className="fixed bottom-8 right-8 w-16 h-16 bg-black text-gray rounded-full flex items-center  justify-center shadow-lg hover:bg-gray-800 transition-all">
          <span className="text-5xl -mt-3">+</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
