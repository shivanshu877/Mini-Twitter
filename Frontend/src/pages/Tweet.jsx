import React, { useRef, useState } from "react";
import moment from "moment"; // Import moment.js for date formatting

const Tweet = ({ username, content, image, createdAt }) => {
  const cardSize = "600px"; // Fixed size for both width and height
  const videoRef = useRef(null); // Reference for video element
  const [isPlaying, setIsPlaying] = useState(false); // State to track video playing status

  // Function to check if the file is a video based on its extension
  const isVideo = (file) => {
    const videoExtensions = [".mp4", ".mkv", ".webm", ".avi", ".mov"];
    return videoExtensions.some((ext) => file.toLowerCase().endsWith(ext));
  };

  const openInNewTab = (url) => {
    const newWindow = window.open();
    newWindow.document.write(`
      <html>
        <head>
          <title>Video</title>
          <style>
            body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #000; }
            video { width: 80%; height: auto; }
          </style>
        </head>
        <body>
          <video controls>
            <source src="${url}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  // Function to toggle video play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="flex w-[400px] h-[400px] mx-auto bg-white shadow-lg rounded-xl overflow-hidden my-4 lg:my-8">
      <div className="p-6 flex flex-col justify-between h-full">
        <div className="flex items-center space-x-4 mb-4">
          <img
            className="h-20 w-20 rounded-full border border-white"
            src={`https://robohash.org/${username}`}
            alt={`${username}'s avatar`}
          />
          <div className="flex flex-col">
            <div className="text-xl font-semibold text-gray-900">
              {username}
            </div>
            <div className="text-m text-gray-500">
              {moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}
            </div>
          </div>
        </div>
        <div
          className="text-gray-800 overflow-hidden"
          style={{ maxHeight: "240px" }} // Adjust the max height as needed
        >
          <p className="whitespace-wrap">{content}</p>
        </div>
        {image && (
          <div
            className={`relative rounded-xl overflow-hidden mt-4 ${
              isVideo(image) ? "cursor-pointer" : ""
            }`}
            style={{ maxHeight: "240px" }}
            onClick={isVideo(image) ? togglePlay : null}
          >
            {isVideo(image) ? (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  controls
                  onClick={togglePlay}
                >
                  <source src={image} type="video/mp4" />
                </video>
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-white opacity-75 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={togglePlay}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 14l5-4-5-4v8z"
                      />
                    </svg>
                  </div>
                )}
              </>
            ) : (
              <img
                className="w-full h-full object-cover"
                src={image}
                alt="Tweet media"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tweet;
