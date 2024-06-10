import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyTweet from "./MyTweet";
import HeaderNavbar from "./HeaderNavbar";
import { deleteTweet, userTweets } from "../API/post";
import { toast } from "react-toastify";
import Loading from "./Loading";

const MyPosts = () => {
  const navigate = useNavigate();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/loginsignup");
      return;
    }

    userTweets(token)
      .then((data) => {
        setTweets(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tweets: ", error);
        setLoading(false);
      });
  }, [navigate]);

  const onDelete = (id) => {
    console.log("Deleting tweet with id:", id);
    const token = localStorage.getItem("token");

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
        <Loading />
      ) : (
        <>
          {tweets.length === 0 ? (
            <div className="mt-10 text-center">
              <p>No posts are there, go and create one!</p>
            </div>
          ) : (
            tweets.map((tweet) => (
              <MyTweet
                key={tweet._id}
                tweet={{
                  id: tweet._id,
                  username: `@${tweet.user.username}`,
                  content: tweet.content,
                  image: tweet.mediaLink,
                  createdAt: tweet.createdAt,
                }}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default MyPosts;
