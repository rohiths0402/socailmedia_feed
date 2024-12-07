import React, { useEffect, useRef, useState } from "react";
import SharePopup from "./popup";
import { useNavigate } from "react-router-dom";

const Post = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const hashtags = Array.isArray(post.hashtags)
    ? post.hashtags
    : post.hashtags && post.hashtags.startsWith("[")
      ? JSON.parse(post.hashtags)
      : [];
  const images = Array.isArray(post.images)
    ? post.images
    : post.images && post.images.startsWith("[")
      ? JSON.parse(post.images)
      : [];

  const videoRef = useRef(null);
  const timeAgo = (timestamp) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(timestamp)) / 1000);
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, "seconds");
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return rtf.format(-diffInMinutes, "minutes");
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return rtf.format(-diffInHours, "hours");
    }
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return rtf.format(-diffInDays, "days");
    }
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return rtf.format(-diffInMonths, "months");
    }
    const diffInYears = Math.floor(diffInDays / 365);
    return rtf.format(-diffInYears, "years");
  };

  // Use IntersectionObserver for video autoplay on scroll
  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch((err) => {
            console.error("Error playing video:", err);
          });
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-purple-100 p-6 space-y-2 rounded-3xl shadow mb-5">
      {/* User Info */}
      <div className="flex items-center mb-3 ">
        <img
          src={`https://via.placeholder.com/40?text=${post.name ? post.name[0] : "U"}`}
          alt="User"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h2 className="font-semibold text-gray-800">
            {post.name || "Unknown User"}
          </h2>
          <p className="text-sm text-gray-500">{timeAgo(post.timestamp)}</p>
        </div>
      </div>

      {/* Post Text */}
      <p className="mb-2 text-gray-800">
        {post.text || "No content available"}
      </p>

      {/* Hashtags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {hashtags.map((tag, index) => (
          <span
            key={index}
            className="text-blue-500 text-sm font-medium hover:underline"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Render Images */}
      {images && images.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {images.map((img, index) => (
            <img
              key={index}
              src={img} // Assuming it's a valid image URL or path
              alt="Post"
              className="rounded-lg w-full h-40 object-cover"
            />
          ))}
        </div>
      ) : (
        <p></p> // Optionally, display a message if there are no images
      )}

      {/* Render Video */}
      {post.video && (
        <div className="relative">
          <video
            ref={videoRef}
            className="rounded-lg w-full h-40 object-cover"
            preload="metadata"
            controls
            muted
          >
            <source src={post.video} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Footer with Like, Comment, and Share buttons */}
      <div className="flex justify-between items-center mt-3">
        {/* Like Button */}
        <button className="flex items-center text-red-500 space-x-2">
          <span>&hearts;</span>
          <span className="text-sm font-medium">{post.likes || 0}</span>
        </button>

        {/* Comment Button */}
        <button className="flex -ml-[20%] text-blue-500 space-x-2">
          <span>
            <i className="fa-regular fa-comment"></i> {/* Comment icon */}
          </span>
          <span className="text-sm font-medium">10</span>
        </button>

        {/* Eye Icon for Views */}
        <button className="flex -ml-[20%] text-gray-500 space-x-2">
          <span>
            <i className="fa-regular fa-eye"></i> {/* Eye icon */}
          </span>
          <span className="text-sm font-medium">500</span>
        </button>

        {/* Share Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-blue-500 text-sm font-medium"
        >
          Share
        </button>
      </div>
      <div className="p-4">
        <label
          htmlFor="media-input"
          className="fixed bottom-4 right-10 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-all cursor-pointer"
        >
          <a href="/preview">
            <span className="text-2xl">
              <i className="fas fa-plus"></i> {/* Add Icon */}
            </span>
          </a>
        </label>
      </div>

      {/* Share Popup */}
      <SharePopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        link={`https://example.com/posts/${post.id}`}
      />
    </div>
  );
};

export default Post;
