import React, { useState, useEffect } from "react";
import HeaderNavbar from "./HeaderNavbar";
import {
  getAllUsers,
  getFollowing,
  followUser,
  unfollowUser,
} from "../API/users";
import Loading from "./Loading"; // Import the Loading component
import { toast } from "react-toastify";
import SmallLoader from "./SmallLoader"; // Import the SmallLoader component
const Users = () => {
  const [users, setUsers] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const allUsers = await getAllUsers(token);
        const following = await getFollowing(token);

        const currentUser = localStorage.getItem("username");
        const filteredUsers = allUsers.filter(
          (user) => user.username !== currentUser
        );

        const followingUsernames = following.map((user) => user);
        setFollowingList(followingUsernames);

        const updatedUsers = filteredUsers.map((user) => {
          const isFollowed = followingUsernames.includes(user.username);
          return {
            ...user,
            followed: isFollowed,
            isLoading: false, // Add loading state for each user
          };
        });

        setUsers(updatedUsers);
        setLoading(false); // Data fetched, stop loading
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchData();
  }, []);

  const toggleFollow = async (userId, followed) => {
    try {
      // Set the loading state for the specific user
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isLoading: true } : user
        )
      );

      const token = localStorage.getItem("token");

      if (followed) {
        await unfollowUser(userId, token);
        toast.success("Unfollowed successfully");
      } else {
        await followUser(userId, token);
        toast.success("Followed successfully");
      }

      // Find the user object in the users array based on userId
      const updatedUsers = users.map((user) =>
        user._id === userId
          ? { ...user, followed: !followed, isLoading: false }
          : user
      );
      setUsers(updatedUsers);

      // Update following list based on the new follow status
      const updatedFollowingList = followed
        ? followingList.filter(
            (username) =>
              username !==
              updatedUsers.find((user) => user._id === userId).username
          )
        : [
            ...followingList,
            updatedUsers.find((user) => user._id === userId).username,
          ];
      setFollowingList(updatedFollowingList);
    } catch (error) {
      console.error("Error toggling follow:", error);
      toast.error("Error toggling follow status");
      // Reset the loading state on error
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isLoading: false } : user
        )
      );
    }
  };

  return (
    <div className="flex flex-col items-center">
      <HeaderNavbar />
      <div className="mt-8 max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        {loading ? (
          <Loading /> // Show Loading component while loading
        ) : (
          <ul>
            {users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                toggleFollow={toggleFollow}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const UserCard = ({ user, toggleFollow }) => {
  return (
    <li className="flex items-center bg-white rounded-lg shadow p-4 mb-4">
      <img
        className="h-16 w-16 rounded-full mr-4"
        src={`https://robohash.org/${user.username}`}
        alt={`${user.username}'s avatar`}
      />
      <div className="flex flex-grow items-center justify-between">
        <p className="text-lg font-semibold">{user.username}</p>
        <button
          className={`ml-4 px-4 py-2 rounded-md ${
            user.followed ? "bg-red-500 text-white" : "bg-blue-500 text-white"
          }`}
          onClick={() => toggleFollow(user._id, user.followed)}
          disabled={user.isLoading} // Disable button while loading
        >
          {user.isLoading ? (
            <SmallLoader /> // Show loading component in button
          ) : user.followed ? (
            "Unfollow"
          ) : (
            "Follow"
          )}
        </button>
      </div>
    </li>
  );
};

export default Users;
