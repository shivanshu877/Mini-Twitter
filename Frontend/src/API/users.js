import axios from "axios";

export const getFollowing = async (token) => {
  try {
    const response = await axios.get(
      `https://speakx2-backend.vercel.app/api/follow/getfollowing`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch following list");
  }
};

export const getFollowers = async (token) => {
  try {
    const response = await axios.get(
      `https://speakx2-backend.vercel.app/api/follow/getfollowers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch following list");
  }
};

export const getAllUsers = async (token) => {
  try {
    const response = await axios.get(
      `https://speakx2-backend.vercel.app/api/follow/getAllUsers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch following list");
  }
};

export const followUser = async (userId, token) => {
  try {
    const response = await axios.post(
      `https://speakx2-backend.vercel.app/api/follow/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to follow user");
  }
};

export const unfollowUser = async (userId, token) => {
  try {
    const response = await axios.post(
      `https://speakx2-backend.vercel.app/api/follow/unfollow/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to unfollow user");
  }
};
