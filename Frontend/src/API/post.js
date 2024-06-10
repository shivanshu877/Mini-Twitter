import axios from "axios";

const createPost = async (token, content, imageUrl) => {
  try {
    const response = await axios.post(
      `https://speakx2-backend.vercel.app/api/tweets`,
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
    throw error; // Consider handling the error more gracefully
  }
};

const editPost = async (token, id, content, imageUrl) => {
  try {
    const response = await axios.put(
      `https://speakx2-backend.vercel.app/api/tweets/${id}`,
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
      `https://speakx2-backend.vercel.app/api/tweets/timeline`,
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
      `https://speakx2-backend.vercel.app/api/tweets/usertweet`,
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
      `https://speakx2-backend.vercel.app/api/tweets/${id}`,
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
