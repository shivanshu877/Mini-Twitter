import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "../API/auth";

const SignupForm = ({ switchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (username.length < 4) {
      toast.error("Username must be at least 4 characters long.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await auth.signup(username, password);
      console.log("Signup successful:", response);
      toast.success("Signup successful");
      switchToLogin(); // Switch to login form after successful signup
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-center mb-4">Signup</h2>
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
        Signup
      </button>
      <p className="mt-3 text-center">
        Already have an account?{" "}
        <button type="button" className="btn btn-link" onClick={switchToLogin}>
          Login
        </button>
      </p>
    </form>
  );
};

export default SignupForm;
