import { React, useState, useEffect } from "react";
import HeaderNavbar from "./HeaderNavbar";
import { getFollowing } from "../API/users";
const Following = () => {
  const [followingData, setFollowingData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch the list of users you are following
      getFollowing(token)
        .then((followingList) => {
          setFollowingData(followingList);
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
        <h2 className="text-2xl font-semibold mb-4">Following</h2>
        <ul className="grid grid-cols-3 gap-4">
          {followingData.map((following, index) => (
            <FollowingCard key={index} username={following} />
          ))}
        </ul>
      </div>
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
