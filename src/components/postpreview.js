import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const PostPreview = () => {
  const [selectedImages, setSelectedImages] = useState([]); // Array to store selected images
  const [currentPreview, setCurrentPreview] = useState(null); // Single preview before saving
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Handle file input and preview
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const previewURL = URL.createObjectURL(files[0]); // Preview the first selected file
      setCurrentPreview(previewURL); // Update preview to latest selected file
      setSelectedImages((prev) => [...prev, previewURL]); // Automatically save the selected image
    }
  };

  // Set preview to the clicked image from the selected images list
  const handleImageClick = (src) => {
    setCurrentPreview(src); // Set clicked image as the new preview
  };

  // Navigate to the upload page and pass the selected images
  const handleNext = () => {
    navigate("/upload", { state: { selectedImages } });
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      {/* Current Preview Section */}
      <button className="absolute top-5 left-3 flex items-center text-white font-bold py-2 px-4 rounded-3xl -mb-10 z-10">
        <a href="/">
          <i className="fas fa-arrow-left mr-2"></i>
        </a>
      </button>
      <button
        onClick={handleNext} // Navigate to Upload page
        className="absolute top-5 right-3 flex items-center text-white font-medium py-2 px-4 rounded-3xl -mb-10 z-10"
      >
        <a href="/upload">Next</a>
      </button>
      <div className="w-full max-w-2xl h-64 sm:h-96 bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center relative cursor-pointer">
        {/* If an image is selected, show the preview; otherwise, show a placeholder */}
        {currentPreview ? (
          <img
            src={currentPreview}
            alt="Current Preview"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="bg-black text-white text-center text-lg">
            Select an image to preview
          </div>
        )}

        {/* Label element triggers the file input when clicked */}
        <label
          htmlFor="file-input"
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg rounded-lg cursor-pointer hover:bg-opacity-60 transition-all"
        >
          Click to select an image
        </label>

        {/* Hidden file input */}
        <input
          type="file"
          id="file-input"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Add a button to select another image after one is selected */}
        {currentPreview && (
          <button
            onClick={() => document.getElementById("file-input").click()}
            className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-md "
          >
            <i className="fa fa-layer-group"></i>
          </button>
        )}
      </div>

      {/* Saved Images Section */}
      {selectedImages.length > 0 && (
        <div className="w-full max-w-2xl mt-6">
          <h2 className="text-xl font-semibold mb-4">Selected Images:</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {selectedImages.map((src, index) => (
              <div
                key={index}
                className="relative border-2 border-gray-300 rounded-lg overflow-hidden"
                onClick={() => handleImageClick(src)} // Set preview on click
              >
                <img
                  src={src}
                  alt={`Saved ${index + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPreview;
