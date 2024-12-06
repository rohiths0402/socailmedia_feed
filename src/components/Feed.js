// src/components/Feed.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setLoading } from "../Slice/postsSlice";
import Post from "./Post";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

const Feed = () => {
  const { posts, loading, lastVisible } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  // Load posts from Firestore
  const loadPosts = async () => {
    const db = getFirestore();
    let postsQuery = query(
      collection(db, "posts"),
      orderBy("timestamp", "desc"),
      limit(20),
    );

    if (lastVisible) {
      postsQuery = query(postsQuery, startAfter(lastVisible));
    }

    dispatch(setLoading(true));

    try {
      const querySnapshot = await getDocs(postsQuery);
      const newPosts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const lastVisiblePost = querySnapshot.docs[querySnapshot.docs.length - 1];
      dispatch(setPosts({ posts: newPosts, lastVisible: lastVisiblePost }));
    } catch (error) {
      console.error("Error loading posts: ", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Infinite scroll handler
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && !loading) {
      loadPosts();
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div onScroll={handleScroll} className="feed-container overflow-auto">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {loading && <p>Loading posts...</p>}
    </div>
  );
};

export default Feed;
