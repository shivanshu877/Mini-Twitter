import React, { useEffect, useState } from "react";
import HeaderNavbar from "./HeaderNavbar";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      setError("Username not found in localStorage");
    }
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <HeaderNavbar />
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md w-80">
        <div className="flex flex-col items-center">
          {error ? (
            <p>Error: {error}</p>
          ) : (
            <>
              <img
                className="h-24 w-24 rounded-full mb-4"
                src={`https://robohash.org/${username}`}
                alt={`${username}'s avatar`}
              />
              <h1 className="text-2xl font-semibold text-gray-900">
                {username}
              </h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
