// src/components/Post.js
import React from "react";

const Post = ({ post }) => {
  return (
    <div className="post bg-white p-4 rounded shadow-lg mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{post.username}</h3>
        <span className="text-sm text-gray-500">
          {new Date(post.timestamp).toLocaleString()}
        </span>
      </div>
      <p>{post.content}</p>
      {post.images && post.images.length > 0 && (
        <div className="mt-4">
          {post.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Post Image ${index + 1}`}
              className="w-full h-auto mb-2"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
