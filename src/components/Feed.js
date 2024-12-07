import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setLoading } from "../Slice/postsSlice";
import Post from "./Post";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const { posts, loading, lastVisible } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        id: doc.id,
        ...doc.data(),
      }));

      const lastVisiblePost = querySnapshot.docs[querySnapshot.docs.length - 1];
      const lastVisibleId = lastVisiblePost ? lastVisiblePost.id : null;

      dispatch(setPosts({ posts: newPosts, lastVisible: lastVisibleId }));
    } catch (error) {
      console.error("Error loading posts: ", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleLabelClick = () => {
    navigate("/preview"); // Navigate to the preview page
  };

  return (
    <div className="feed-container bg-white-200 overflow-auto mt-20">
      {/* Posts Feed */}
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post, index) => {
          const key = post.id ? post.id : `fallback-key-${index}`;
          return <Post key={key} post={post} />;
        })
      ) : (
        <p>{loading ? "Loading posts..." : "No posts available."}</p>
      )}
    </div>
  );
};

export default Feed;
