// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import auth from "../API/auth";
// import Loading from "./Loading"; // Import your loading component

// const SignupForm = ({ switchToLogin }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false); // Add loading state

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (username.length < 4) {
//       toast.error("Username must be at least 4 characters long.");
//       return;
//     }

//     if (password.length < 6) {
//       toast.error("Password must be at least 6 characters long.");
//       return;
//     }

//     setLoading(true); // Set loading to true when starting the signup process

//     try {
//       const response = await auth.signup(username, password);
//       toast.success("User registered successfully!"); // Show success toast before switching to login
//       switchToLogin();
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false); // Set loading to false when the signup process is done
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4">
//       <h2 className="text-center mb-4">Signup</h2>
//       <div className="form-group mb-4">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>
//       <div className="form-group mb-4">
//         <input
//           type="password"
//           className="form-control"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <button
//         type="submit"
//         className="btn btn-primary btn-block"
//         disabled={loading}
//       >
//         {loading ? <Loading /> : "Signup"}{" "}
//         {/* Conditionally render the loading component */}
//       </button>
//       <p className="mt-3 text-center">
//         Already have an account?{" "}
//         <button type="button" className="btn btn-link" onClick={switchToLogin}>
//           Login
//         </button>
//       </p>
//     </form>
//   );
// };

// export default SignupForm;
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "../API/auth";
import Loading from "./Loading"; // Import your loading component

const SignupForm = ({ switchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

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

    setLoading(true); // Set loading to true when starting the signup process

    try {
      const response = await auth.signup(username, password);
      toast.success("User registered successfully!"); // Show success toast before switching to login
      switchToLogin();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Set loading to false when the signup process is done
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
        {/* Conditionally render the loading component */}
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
