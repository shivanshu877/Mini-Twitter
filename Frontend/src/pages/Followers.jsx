import React from "react";
import HeaderNavbar from "./HeaderNavbar";
import { useState, useEffect } from "react";
import { getFollowers } from "../API/users";
const Followers = () => {
  const [followersData, setfollowersData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch the list of users you are followers
      getFollowers(token)
        .then((followersList) => {
          setfollowersData(followersList);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  return (
    <div className="flex flex-col items-center">
      <HeaderNavbar />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Followers</h2>
        <ul className="grid grid-cols-3 gap-4">
          {followersData.map((follower, index) => (
            <FollowerCard key={index} username={follower} />
          ))}
        </ul>
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
