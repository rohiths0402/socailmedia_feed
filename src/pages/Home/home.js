// src/pages/Home.js
import React from "react";
import Feed from "../../components/Feed";
import Header from "../../components/Header";
// import UserProfile from "../components/UserProfile";
import Post from "../../components/Post";

const Home = () => {
  return (
    <div>
      <Header />
      <Post />
      <Feed />
    </div>
  );
};

export default Home;
