import React, { useState, useEffect } from "react";
import HeaderNavbar from "./HeaderNavbar";
import { getFollowing } from "../API/users";
import Loading from "./Loading"; 
const Following = () => {
  const [followingData, setFollowingData] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getFollowing(token)
        .then((followingList) => {
          setFollowingData(followingList);
          setLoading(false); 
        })
        .catch((error) => {
          console.error(error);
          setLoading(false); 
        });
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <HeaderNavbar />
      {loading ? (
        <Loading /> 
      ) : (
        <>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Following</h2>
            {followingData.length > 0 ? (
              <ul className="grid grid-cols-3 gap-4">
                {followingData.map((following, index) => (
                  <FollowingCard key={index} username={following} />
                ))}
              </ul>
            ) : (
              <p className="text-lg text-gray-600">
                Not following anyone yet. 😕
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const FollowingCard = ({ username }) => {
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

export default Following;
