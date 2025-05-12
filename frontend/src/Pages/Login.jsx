import React from "react";
import "./Login.css";
import { useState } from "react";

const Login = () => {
  const [isActive, setIsActive] = useState(false);

  // Toggle between login and signup
  const handleRegisterClick = () => {
    setIsActive(true); // Show sign-up form
  };

  const handleLoginClick = () => {
    setIsActive(false); // Show sign-in form
  };
  return (
    <div className="test">
      <div className={`container ${isActive ? "active" : ""}`} id="container">
        <div class="form-container sign-up">
          <form>
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in">
          <form>
            <h1>Sign In</h1>
            <span>use your email and password</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="">Forgot your email or password?</a>
            <button>Sign in</button>
          </form>
        </div>
        <div class="toggle-container">
          <div class="toggle">
            <div class="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button onClick={handleLoginClick} class="hidden" id="login">
                Sign In
              </button>
            </div>
            <div class="toggle-panel toggle-right">
              <h1>Hello, User!</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <button
                onClick={handleRegisterClick}
                class="hidden"
                id="register"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
