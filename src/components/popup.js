import React from "react";

const SharePopup = ({ isOpen, onClose, link }) => {
  if (!isOpen) return null; // Don't render the popup if it's not open.

  const platforms = [
    {
      icon: <i className="fab fa-twitter"></i>,
      name: "Twitter",
      color: "bg-blue-400",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=Check%20this%20out!`,
    },
    {
      icon: <i className="fab fa-facebook-f"></i>, // Facebook Icon
      color: "bg-blue-600",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
    },
    {
      icon: <i className="fab fa-reddit"></i>, // Reddit Icon
      color: "bg-orange-500",
      url: `https://www.reddit.com/submit?url=${encodeURIComponent(link)}&title=Check%20this%20out!`,
    },
    {
      icon: <i className="fab fa-whatsapp"></i>, // WhatsApp Icon
      color: "bg-green-500",
      url: `https://wa.me/?text=${encodeURIComponent(link)}`,
    },
    {
      icon: <i className="fab fa-telegram-plane"></i>, // Telegram Icon
      color: "bg-blue-400",
      url: `https://t.me/share/url?url=${encodeURIComponent(link)}&text=Check%20this%20out!`,
    },
    {
      icon: <i className="fab fa-facebook-messenger"></i>, // Messenger Icon
      color: "bg-blue-500",
      url: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(link)}&app_id=YOUR_APP_ID&redirect_uri=${encodeURIComponent(link)}`,
    },
    {
      icon: <i className="fab fa-discord"></i>, // Discord Icon
      color: "bg-gray-800",
      url: `https://discord.com/channels/@me?text=${encodeURIComponent(link)}`,
    },
    {
      icon: <i className="fab fa-instagram"></i>, // Instagram Icon
      color: "bg-pink-500",
      url: `https://www.instagram.com/?url=${encodeURIComponent(link)}`,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 -ml-8 w-96 shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        {/* Header */}
        <h2 className="text-lg font-bold mb-4">Share Post</h2>

        {/* Social Media Links */}
        <div className="grid grid-cols-4 gap-5 mb-4">
          {platforms.map((platform) => (
            <a
              key={platform.name} // Use unique 'name' as key
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${platform.color} w-16 h-16 flex items-center justify-center rounded-full text-white text-2xl hover:opacity-80`}
            >
              {platform.icon}
            </a>
          ))}
        </div>

        {/* Page Link */}
        <div>
          <label htmlFor="link" className="text-sm text-gray-700">
            Page Link
          </label>
          <div className="flex items-center mt-1">
            <input
              id="link"
              value={link}
              readOnly
              className="w-full border border-gray-300 rounded-l px-3 py-2"
            />
            <button
              onClick={() => navigator.clipboard.writeText(link)}
              className="bg-gray-300 px-3 py-2 rounded-r text-gray-700 hover:bg-gray-400"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;
