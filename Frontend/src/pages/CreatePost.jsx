import React, { useState, useEffect } from "react";
import HeaderNavbar from "./HeaderNavbar";
import { editPost, createPost } from "../API/post";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading"; // Import the SmallLoader component

const CreatePost = ({ postId, initialContent, initialImage }) => {
  const [id, setId] = useState(postId);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null); // State for file (either image or video)
  const [fileUrl, setFileUrl] = useState(""); // State for file URL
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
    }
    if (initialImage) {
      setFileUrl(initialImage);
    }
    if (postId) {
      setId(postId);
    }
  }, [initialContent, initialImage, postId]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_cloudnary_preset_name
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          process.env.REACT_APP_cloudnary_cloud_name
        }/${file.type.startsWith("image") ? "image" : "video"}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setFileUrl(data.secure_url);
      console.log(
        `${file.type.startsWith("image") ? "Image" : "Video"} uploaded: `,
        data.secure_url
      );
      setLoading(false);
    } catch (error) {
      console.error(
        `Error uploading ${
          file.type.startsWith("image") ? "image" : "video"
        }: `,
        error
      );
      setLoading(false);
    }
  };

  const handlePost = async () => {
    setPosting(true);
    try {
      if (postId) {
        const response = await editPost(token, id, content, fileUrl);
        toast.success("Post updated successfully");
        setId(null);
        setContent("");
        setFileUrl("");
      } else {
        const response = await createPost(token, content, fileUrl);
        toast.success("Post created successfully");
        setId(null);
        setContent("");
        setFileUrl("");
      }
    } catch (error) {
      toast.error("Error occurred while saving the post");
      console.error("Error saving post:", error);
    } finally {
      setPosting(false);
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
          accept="image/*,video/*" // Accept both image and video files
          onChange={handleFileChange}
          className="mb-4"
        />
        {fileUrl && (
          <div className="mt-4">
            <p className="font-semibold">
              {file.type.startsWith("image") ? "Image" : "Video"} URL:
            </p>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              {fileUrl}
            </a>
          </div>
        )}
        <button
          onClick={uploadFile}
          disabled={!file || loading}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Uploading..." : "Upload File"}
        </button>
        <button
          onClick={handlePost}
          disabled={!content || !fileUrl || posting}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
        >
          {posting ? <Loading /> : postId ? "Edit Post" : "Create Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
