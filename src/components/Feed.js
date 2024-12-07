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
  useEffect(() => {
    const postIds = posts.map((post) => post.id);
    const uniqueIds = new Set(postIds);

    if (uniqueIds.size !== postIds.length) {
      console.warn("Duplicate keys found in posts:", postIds);
    }
  }, [posts]);

  return (
    <div className="feed-container bg-white-200 overflow-auto mt-20">
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
