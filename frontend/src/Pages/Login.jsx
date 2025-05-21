import React from "react";
import "./Login.css";
import { useState,useEffect } from "react";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isActive, setIsActive] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAuthenticated) {
      console.log('User is already authenticated:', user);
      // Redirect if already logged in
      switch (user.role) {
        case 'ADMIN':
          navigate('/AdminDashboard');
          break;
        case 'MANAGER':
          navigate('/ManagerDashboard');
          break;
        case 'USER':
          navigate('/MyDetails');
          break;
        default:
          navigate('/unauthorized');
      }
    }
  }, [user, navigate]);

  // Toggle between login and signup
  const handleRegisterClick = () => {
    setIsActive(true); // Show sign-up form
  };

  const handleLoginClick = () => {
    setIsActive(false); // Show sign-in form
  };

  const loginUser = async (email, password) => {
    const res = await fetch('http://localhost:8081/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) throw new Error('Login failed');
    return res.json(); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, role } = await loginUser(email, password);
      setUser({ isAuthenticated: true, role, token });

      console.log('User role:', role);
      console.log('User token:', token);

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      switch (role) {
        case 'ADMIN':
          navigate('/AdminDashboard');
          break;
        case 'MANAGER':
          navigate('/ManagerDashboard');
          break;
        case 'USER':
          navigate('/MyDetails');
          break;
        default:
          navigate('/unauthorized');
      }
    } catch (err) {
      console.error(err);
      alert('Invalid login');
    }
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
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <span>use your email and password</span>
            <input 
              type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password" placeholder="Password"  value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
