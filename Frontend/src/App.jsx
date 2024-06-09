import React from "react";
import "./App.css";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import LoginFormSignupForm from "./pages/LoginFormSignupForm";
import Home from "./pages/Home";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import MyPosts from "./pages/MyPosts";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import Logout from "./pages/Logout";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/followers" element={<Followers />} />
      <Route path="/following" element={<Following />} />
      <Route path="/my-posts" element={<MyPosts />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/users" element={<Users />} />
      <Route path="/logout" element={<Logout />} />

      <Route path="/edit-post/:id" element={<CreatePostWrapper />} />
      <Route path="/loginsignup" element={<LoginFormSignupForm />} />
    </Routes>
  );
}

const CreatePostWrapper = () => {
  const location = useLocation();
  const { id } = useParams();
  const { content, image } = location.state || {};

  return (
    <CreatePost postId={id} initialContent={content} initialImage={image} />
  );
};

export default App;
