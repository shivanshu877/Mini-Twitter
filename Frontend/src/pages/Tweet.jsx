// import React from "react";

// const Tweet = ({ username, content, image }) => {
//   return (
//     <div
//       className="flex w-96 mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-4"
//       style={{ height: "380px" }}
//     >
//       <div className="p-6 flex flex-col justify-between w-full">
//         <div>
//           <div className="flex items-center space-x-4 mb-4">
//             <img
//               className="h-16 w-16 rounded-full"
//               src={`https://robohash.org/${username}`}
//               alt={`${username}'s avatar`}
//             />
//             <div className="text-xl font-semibold text-gray-900">
//               {username}
//             </div>
//           </div>
//           <div
//             className="text-gray-800 mb-6 overflow-hidden"
//             style={{ maxHeight: "6.5em" }}
//           >
//             {content}
//           </div>
//         </div>
//         {image && (
//           <div className="rounded-xl overflow-hidden">
//             <img
//               className="w-full h-64 object-cover"
//               src={image}
//               alt="Tweet image"
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Tweet;
import React from "react";

const Tweet = ({ username, content, image }) => {
  const cardWidth = "420px"; // Adjustable base width
  const cardHeight = image ? "440px" : "360px"; // Adjust based on content length
  const imageHeight = image ? "240px" : 0; // Maintain aspect ratio if image exists

  return (
    <div
      className={`flex w-${cardWidth} mx-auto bg-white shadow-lg rounded-xl overflow-hidden my-4 lg:my-8`}
      style={{ height: cardHeight }}
    >
      <div className="p-6 flex flex-col justify-between h-full">
        <div className="flex items-center space-x-4 mb-4">
          <img
            className="h-16 w-16 rounded-full border border-white" // Add subtle border
            src={`https://robohash.org/${username}`}
            alt={`${username}'s avatar`}
          />
          <div className="text-xl font-semibold text-gray-900">{username}</div>
        </div>
        <div className="text-gray-800 overflow-hidden">
          <p style={{ maxHeight: "7.5em" }}>{content}</p>
          {/* Optional: Implement text wrapping/overflow handling for longer content */}
        </div>
        {image && (
          <div className="rounded-xl overflow-hidden mt-4">
            <img
              className={`w-full h-${imageHeight} object-cover`}
              src={image}
              alt="Tweet image"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tweet;
