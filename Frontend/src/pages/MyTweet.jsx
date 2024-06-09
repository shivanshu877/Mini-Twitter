import React from "react";

const MyTweet = ({ tweet, onDelete, onEdit }) => {
  const { id, username, content, image } = tweet;

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    onEdit(id , content, image);
  };

  return (
    <div
      className="flex w-96 mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-4"
      style={{ height: "380px" }}
    >
      <div className="p-6 flex flex-col justify-between w-full">
        <div>
          <div className="flex items-center space-x-4 mb-4"></div>
          <div
            className="text-gray-800 mb-6 overflow-hidden"
            style={{ maxHeight: "6.5em" }}
          >
            {content}
          </div>
        </div>
        {image && (
          <div className="rounded-xl overflow-hidden">
            <img
              className="w-full h-64 object-cover"
              src={image}
              alt="Tweet image"
            />
          </div>
        )}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleDelete}
            className="mr-2 bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyTweet;
