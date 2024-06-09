import axios from "axios";

const login = async (username, password) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/login`,
      {
        username: username,
        password: password,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const signup = async (username, password) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/register`,
      {
        username: username,
        password: password,
      }
    );
    // Assuming your backend returns some data upon successful login
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { login, signup };
