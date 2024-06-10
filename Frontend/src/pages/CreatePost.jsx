import React, { useState, useEffect } from "react";
import HeaderNavbar from "./HeaderNavbar";
import { editPost, createPost } from "../API/post";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading"; // Import the SmallLoader component

const CreatePost = ({ postId, initialContent, initialImage }) => {
  const [id, setId] = useState(postId);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false); // Add posting state
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
    }
    if (initialImage) {
      setImageUrl(initialImage);
    }
    if (postId) {
      setId(postId);
    }
  }, [initialContent, initialImage, postId]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.REACT_APP_cloudnary_preset_name);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_cloudnary_cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setImageUrl(data.secure_url);
      console.log("Image uploaded: ", data.secure_url);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image: ", error);
      setLoading(false);
    }
  };

  const handlePost = async () => {
    setPosting(true); // Set posting state to true when starting the post process
    try {
      if (postId) {
        const response = await editPost(token, id, content, imageUrl);

        toast.success("Post updated successfully");
        setId(null);
        setContent("");
        setImageUrl("");
      } else {
        const response = await createPost(token, content, imageUrl);
        toast.success("Post created successfully");
        setId(null);
        setContent("");
        setImageUrl("");
      }
    } catch (error) {
      toast.error("Error occurred while saving the post");
      console.error("Error saving post:", error);
    } finally {
      setPosting(false); // Set posting state to false after the post process
    }
  };

  return (
    <div className="flex flex-col items-center">
      <HeaderNavbar />
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">
          {postId ? "Edit Post" : "Create Post"}
        </h2>
        <textarea
          value={content}
          onChange={handleContentChange}
          className="w-full border rounded-md p-2 mb-4"
          placeholder="Write something..."
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />
        <button
          onClick={uploadImage}
          disabled={!image || loading}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
        {imageUrl && (
          <div className="mt-4">
            <p className="font-semibold">Image URL:</p>
            <a href={imageUrl} target="_blank" rel="noopener noreferrer">
              {imageUrl}
            </a>
          </div>
        )}
        <button
          onClick={handlePost}
          disabled={!content || (!imageUrl && !initialImage) || posting}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
        >
          {posting ? <Loading /> : postId ? "Edit Post" : "Create Post"}{" "}
          {/* Conditionally render SmallLoader */}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
