import React, { useEffect, useState } from "react";
import Tweet from "./Tweet";
import HeaderNavbar from "./HeaderNavbar";
import { useNavigate } from "react-router-dom";
import { fetchPosts } from "../API/post";
import Loading from "./Loading"; 

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true); 

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/loginsignup");
      return; 
    }

    fetchPosts(token)
      .then((data) => {
        const formattedTweets = data.map((tweet) => ({
          username: tweet.user.username,
          content: tweet.content,
          image: tweet.mediaLink,
          createdAt: tweet.createdAt,
        }));

        setTweets(formattedTweets);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching tweets: ", error);
        setLoading(false); 
      });
  }, [navigate]);

  return (
    <div className="flex flex-col items-center">
      <HeaderNavbar /> {/* Include the Navbar when not loading */}
      {loading ? (
        <Loading /> 
      ) : (
        <div className="tweet-feed mt-24 w-full flex flex-col items-center">
          {tweets.length > 0 ? (
            tweets.map((tweet, index) => <Tweet key={index} {...tweet} />)
          ) : (
            <div className="flex flex-col items-center justify-center h-64 mt-24">
              <p className="text-lg font-semibold text-gray-700">
                No tweets to show. Follow users to see their posts! 😊
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
