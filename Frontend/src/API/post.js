import axios from "axios";

const createPost = async (token, content, imageUrl) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/tweets`,
      {
        content: content,
        mediaLink: imageUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating tweet:", error);
    throw error;
  }
};

const editPost = async (token, id, content, imageUrl) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/tweets/${id}`,
      {
        id: id,
        content: content,
        mediaLink: imageUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchPosts = async (token) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/tweets/timeline`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching posts: ", error);
    throw error;
  }
};

const userTweets = async (token) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/tweets/usertweet`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching posts: ", error);
    throw error;
  }
};

const deleteTweet = async (id, token) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/tweets/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching posts: ", error);
    throw error;
  }
};

export { createPost, editPost, fetchPosts, userTweets, deleteTweet };
