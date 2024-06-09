import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserFriends,
  FaUser,
  FaPen,
  FaSignOutAlt,
} from "react-icons/fa";
import "./HeaderNavbar.css";

const HeaderNavbar = () => {
  return (
    <header className="header-navbar">
      <div className="logo">Mini Twitter</div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/users">
              <FaUserFriends /> Users
            </Link>
          </li>
          <li>
            <Link to="/followers">
              <FaUserFriends /> Followers
            </Link>
          </li>
          <li>
            <Link to="/following">
              <FaUserFriends /> Following
            </Link>
          </li>
          <li>
            <Link to="/my-posts">
              <FaPen /> My Posts
            </Link>
          </li>
          <li>
            <Link to="/create-post">
              <FaPen /> Create Post
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <FaUser /> Profile
            </Link>
          </li>
          <li>
            <Link to="/logout">
              <FaSignOutAlt /> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderNavbar;
