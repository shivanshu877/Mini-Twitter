import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "../API/auth";
import Loading from "./Loading";

const SignupForm = ({ switchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let trimmedUsername = username.trim();

    // Check if username contains spaces
    if (/\s/.test(trimmedUsername)) {
      toast.error("Username must not contain spaces.");
      return;
    }
    // Check if username is at least 4 characters long
    if (trimmedUsername.length < 4) {
      toast.error("Username must be at least 4 characters long.");
      return;
    }

    // Check if password is at least 6 characters long
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await auth.signup(username, password);
      toast.success("User registered successfully!");
      switchToLogin();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
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
      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={loading}
      >
        {loading ? <Loading /> : "Signup"}{" "}
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
