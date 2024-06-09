import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import HeaderNavbar from "./HeaderNavbar";
import Home from "./Home";
const RootLayout = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/loginsignup" />;
  }

  return (
    <div>
      <HeaderNavbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
