import React, { useEffect } from "react";
import Tweet from "./Tweet";
import HeaderNavbar from "./HeaderNavbar";
import { useNavigate } from "react-router-dom";
import { fetchPosts } from "../API/post";
const Home = () => {
  const [tweets, setTweets] = React.useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/loginsignup");
      return; // Exit early if no token is found
    }

    fetchPosts(token)
      .then((data) => {
        // Extract username, content, and mediaLink from each tweet
        const formattedTweets = data.map((tweet) => ({
          username: tweet.user.username,
          content: tweet.content,
          image: tweet.mediaLink,
        }));

        setTweets(formattedTweets);
      })
      .catch((error) => {
        console.error("Error fetching tweets: ", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <HeaderNavbar></HeaderNavbar>
      <div className="tweet-feed mt-24 w-full flex flex-col items-center">
        {tweets.map((tweet, index) => (
          <Tweet key={index} {...tweet} />
        ))}
      </div>
    </div>
  );
};

export default Home;
