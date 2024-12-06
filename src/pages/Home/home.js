import React from "react";

const Home = () => {
  const posts = [
    {
      id: 1,
      name: "Aarav",
      time: "2 hours ago",
      text: "Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. 🗽",
      hashtags: ["#NYC", "#Travel"],
      images: [
        "https://via.placeholder.com/150x200.png?text=Image1",
        "https://via.placeholder.com/150x200.png?text=Image2",
      ],
      likes: 67,
    },
    {
      id: 2,
      name: "Sneha",
      time: "1 day ago",
      text: "Taking a moment to slow down, breathe, and focus on myself. ✨ Self-care isn’t selfish — it’s necessary. 💆‍♀️",
      hashtags: ["#SelfCare", "#MeTime", "#Wellness"],
      video: "https://via.placeholder.com/300x200.png?text=Video",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <header className="bg-white shadow p-4 rounded-lg mb-4 flex items-center">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h1 className="font-semibold text-lg">Welcome Back,</h1>
          <p className="text-sm text-gray-500">Sakshi Agarwal</p>
        </div>
      </header>
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`bg-white p-4 rounded-lg shadow ${
              post.id === 1 ? "bg-purple-100" : "bg-yellow-100"
            }`}
          >
            <div className="flex items-center mb-3">
              <img
                src={`https://via.placeholder.com/40?text=${post.name[0]}`}
                alt="User"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h2 className="font-semibold text-gray-800">{post.name}</h2>
                <p className="text-sm text-gray-500">{post.time}</p>
              </div>
            </div>
            <p className="mb-2 text-gray-800">{post.text}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {post.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="text-blue-500 text-sm font-medium hover:underline"
                >
                  {tag}
                </span>
              ))}
            </div>
            {post.images && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {post.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Post"
                    className="rounded-lg w-full h-40 object-cover"
                  />
                ))}
              </div>
            )}
            {post.video && (
              <div className="relative">
                <img
                  src={post.video}
                  alt="Video"
                  className="rounded-lg w-full h-40 object-cover"
                />
                <button className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50">
                  ▶
                </button>
              </div>
            )}
            <div className="flex justify-between items-center mt-3">
              <button className="flex items-center text-red-500 space-x-2">
                <span>❤️</span>
                <span className="text-sm font-medium">{post.likes}</span>
              </button>
              <button className="text-blue-500 text-sm font-medium">
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
