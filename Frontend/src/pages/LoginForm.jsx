import React, { useState } from "react";
import auth from "../API/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ switchToSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await auth.login(username, password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("username", username);
      console.log("Login successful:", response);
      navigate("/"); // Navigate to the home page after login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-center mb-4">Login</h2>
      <div className="form-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group mb-4">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        Login
      </button>
      <p className="mt-3 text-center">
        Don't have an account?{" "}
        <button type="button" className="btn btn-link" onClick={switchToSignup}>
          Sign up
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
