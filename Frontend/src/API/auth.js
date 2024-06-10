import axios from "axios";

const login = async (username, password) => {
  try {
    const response = await axios.post(
      `https://speakx2-backend.vercel.app/api/auth/login`,
      {
        username: username,
        password: password,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};

const signup = async (username, password) => {
  try {
    const response = await axios.post(
      `https://speakx2-backend.vercel.app/api/auth/register`,
      {
        username: username,
        password: password,
      }
    );

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};

export default { login, signup };
