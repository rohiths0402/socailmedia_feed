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
      </div>
    </div>
  );
};

export default Home;
