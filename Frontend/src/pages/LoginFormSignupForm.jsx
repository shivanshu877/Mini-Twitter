// import React, { useState, useEffect } from "react";
// import LoginForm from "./LoginForm";
// import SignupForm from "./SignupForm";
// import { useNavigate } from "react-router-dom";
// import "./LoginFormSignupForm.css"; // Ensure you have created this CSS file for custom styles

// const LoginFormSignupForm = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate("/");
//     }
//   }, [navigate]);

//   const [isLogin, setIsLogin] = useState(true);

//   const switchToSignup = () => {
//     setIsLogin(false);
//   };

//   const switchToLogin = () => {
//     setIsLogin(true);
//   };

//   return (
//     <div className="container my-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card shadow-lg">
//             <div className="card-body">
//               {isLogin ? (
//                 <LoginForm switchToSignup={switchToSignup} />
//               ) : (
//                 <SignupForm switchToLogin={switchToLogin} />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginFormSignupForm;
import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useNavigate } from "react-router-dom";
import "./LoginFormSignupForm.css"; // Ensure you have created this CSS file for custom styles

const LoginFormSignupForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const [isLogin, setIsLogin] = useState(true);

  const switchToSignup = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              {isLogin ? (
                <LoginForm switchToSignup={switchToSignup} />
              ) : (
                <SignupForm switchToLogin={switchToLogin} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFormSignupForm;
