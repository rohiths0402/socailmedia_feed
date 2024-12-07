import React, { useEffect, useRef } from "react";

const Post = ({ post }) => {
  const hashtags = Array.isArray(post.hashtags)
    ? post.hashtags
    : JSON.parse(post.hashtags || "[]");
  const images = Array.isArray(post.images)
    ? post.images
    : JSON.parse(post.images || "[]");
  const videoRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (videoRef.current) {
            videoRef.current.play().catch((err) => {
              console.error("Error playing video:", err);
            });
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
          }
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
    <div className="bg-purple-100 p-4  rounded-3xl shadow">
      <div className="flex items-center mb-3">
        <img
          src={`https://via.placeholder.com/40?text=${post.name[0]}`}
          alt="User"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h2 className="font-semibold text-gray-800">{post.name}</h2>
          <p className="text-sm text-gray-500">{post.timestamp}</p>
        </div>
      </div>
      <p className="mb-2 text-gray-800">{post.text}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {hashtags.map((tag) => (
          <span
            key={tag}
            className="text-blue-500 text-sm font-medium hover:underline"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Render images if any */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Post"
              className="rounded-lg w-full h-40 object-cover"
            />
          ))}
        </div>
      )}

      {/* Render video if available */}
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

      <div className="flex justify-between items-center mt-3">
        {/* Like Button */}
        <button className="flex items-center text-red-500 space-x-2">
          <span>&hearts;</span>
          <span className="text-sm font-medium">{post.likes}</span>
        </button>

        {/* Comment Button */}
        <button className="flex -ml-[20%]  text-blue-500 space-x-2 ">
          <span>
            <i className="fa-regular fa-comment "></i> {/* Comment icon */}
          </span>
          <span className="text-sm font-medium">10</span>
        </button>

        {/* Eye Icon for Views */}
        <button className="flex  -ml-[20%] text-gray-500 space-x-2">
          <span>
            <i className="fa-regular fa-eye"></i> {/* Eye icon */}
          </span>
          <span className="text-sm font-medium">500</span> {/* Views count */}
        </button>

        {/* Share Button */}
        <button className="text-blue-500 text-sm font-medium">Share</button>
      </div>
    </div>
  );
};

export default Post;
