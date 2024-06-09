import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token and username from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // Navigate to the login page
    navigate("/");
  }, [navigate]);

  return <div>Logout</div>;
};

export default Logout;
