import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyTweet from "./MyTweet";
import HeaderNavbar from "./HeaderNavbar";
import { deleteTweet, userTweets } from "../API/post";
import { toast } from "react-toastify";
import Loading from "./Loading"; // Import the Loading component

const MyPosts = () => {
  const navigate = useNavigate();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/loginsignup");
      return;
    }

    userTweets(token)
      .then((data) => {
        setTweets(data);
        setLoading(false); // Data fetched, stop loading
      })
      .catch((error) => {
        console.error("Error fetching tweets: ", error);
        setLoading(false); // Stop loading on error
      });
  }, []);

  const onDelete = (id) => {
    console.log("Deleting tweet with id:", id);
    const token = localStorage.getItem("token");
    // Call the deleteTweet API function

    try {
      deleteTweet(id, token);
      setTweets(tweets.filter((tweet) => tweet._id !== id));
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Error occurred while deleting the post");
      console.error("Error deleting post:", error);
    }
  };

  const onEdit = (id, content, image) => {
    console.log("Editing tweet with id:", id);
    navigate(`/edit-post/${id}`, { state: { content, image } });
  };

  return (
    <div className="flex flex-col items-center">
      <HeaderNavbar />
      {loading ? (
        <Loading /> // Show Loading component while loading
      ) : (
        tweets.map((tweet) => (
          <MyTweet
            key={tweet._id}
            tweet={{
              id: tweet._id,
              username: `@${tweet.user.username}`, // Assuming user object contains the username
              content: tweet.content,
              image: tweet.mediaLink,
              createdAt: tweet.createdAt, // Pass the createdAt value
            }}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};

export default MyPosts;
