import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Upload = () => {
  const location = useLocation();
  const { selectedImages } = location.state || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState("");
  const handleNext = () => {
    if (currentIndex < selectedImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold">
        <a href="/preview">
          <i className="fas fa-arrow-left mr-2 -ml-3"></i>
        </a>
        New Post
      </h2>

      {selectedImages && selectedImages.length > 0 ? (
        <div className="relative">
          <img
            src={selectedImages[currentIndex]}
            alt={`Selected Image ${currentIndex + 1}`}
            className="w-full h-auto rounded-lg"
          />
          <span className="absolute top-2 right-2 bg-black text-white text-sm px-2 py-1 rounded-md">
            {currentIndex + 1}/{selectedImages.length}
          </span>
        </div>
      ) : (
        <div className="bg-black text-white text-center text-lg">
          No images selected
        </div>
      )}

      <div className="flex justify-center space-x-2 mt-4">
        {selectedImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-black" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter your description"
        />
      </div>
      <div className="flex flex-wrap space-x-2 text-xs text-gray-500">
        <input
          type="text"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          className="mt-1 block w-full border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter hashtags"
        />
      </div>
      <div className="absolute bottom-10 w-80 ml-5">
        <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full w-full ">
          CREATE
        </button>
      </div>
    </div>
  );
};

export default Upload;
