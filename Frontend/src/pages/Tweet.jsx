import React from "react";

const Tweet = ({ username, content, image }) => {
  const cardSize = "600px"; // Fixed size for both width and height

  return (
    <div className="flex w-[400px] h-[400px] mx-auto bg-white shadow-lg rounded-xl overflow-hidden my-4 lg:my-8">
      <div className="p-6 flex flex-col justify-between h-full">
        <div className="flex items-center space-x-4 mb-4">
          <img
            className="h-20 w-20 rounded-full border border-white"
            src={`https://robohash.org/${username}`}
            alt={`${username}'s avatar`}
          />
          <div className="text-xl font-semibold text-gray-900">{username}</div>
        </div>
        <div
          className="text-gray-800 overflow-hidden"
          style={{ maxHeight: "240px" }} // Adjust the max height as needed
        >
          <p className="whitespace-wrap">{content}</p>
        </div>
        {image && (
          <div
            className="rounded-xl overflow-hidden mt-4"
            style={{ maxHeight: "240px" }}
          >
            {" "}
            {/* Adjust max height */}
            <img
              className="w-full h-full object-cover"
              src={image}
              alt="Tweet image"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tweet;
