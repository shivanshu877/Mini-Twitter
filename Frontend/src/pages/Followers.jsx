import React, { useState, useEffect } from "react";
import HeaderNavbar from "./HeaderNavbar";
import { getFollowers } from "../API/users";
import Loading from "./Loading"; // Import the Loading component

const Followers = () => {
  const [followersData, setFollowersData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch the list of users you are following
      getFollowers(token)
        .then((followersList) => {
          setFollowersData(followersList);
          setLoading(false); // Set loading to false when data is fetched
        })
        .catch((error) => {
          console.error(error);
          setLoading(false); // Set loading to false on error too
        });
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <HeaderNavbar />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Followers</h2>
        {loading ? (
          <Loading /> // Show Loading component while loading
        ) : (
          <>
            {followersData.length > 0 ? (
              <ul className="grid grid-cols-3 gap-4">
                {followersData.map((follower, index) => (
                  <FollowerCard key={index} username={follower} />
                ))}
              </ul>
            ) : (
              <p className="text-lg text-gray-600">No followers yet. 😕</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const FollowerCard = ({ username }) => {
  return (
    <li className="flex flex-col items-center bg-white rounded-lg shadow p-4">
      <img
        className="h-16 w-16 rounded-full mb-2"
        src={`https://robohash.org/${username}`}
        alt={`${username}'s avatar`}
      />
      <p className="text-lg font-semibold">{username}</p>
    </li>
  );
};

export default Followers;
