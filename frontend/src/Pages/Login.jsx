import "./Login.css";
import { useState,useEffect } from "react";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from 'react-router-dom';
import { notification} from 'antd';

const Login = () => {
  const [isActive, setIsActive] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (pauseOnHover, type, message, description) => () => {
      api.open({
        message,
        description,
        showProgress: true,
        pauseOnHover,
        type,
      });
    };

  useEffect(() => {
    if (user.isAuthenticated) {
      
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


  const handleRegisterClick = () => {
    setIsActive(true); 
  };

  const handleLoginClick = () => {
    setIsActive(false); 
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
      openNotification(false, 'error', 'Login failed', 'Please check your email and password and try again.')();
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8081/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: newEmail, password: newPassword })
      });

      if (!res.ok) throw new Error('Registration failed');
      const data = await res.json();
      console.log(data);
      openNotification(false, 'success')();
    } catch (err) {
      console.error(err);
      openNotification(false, 'error')();
    }
  }

  return (
    <div className="test">
      {contextHolder}
      <div className={`container ${isActive ? "active" : ""}`} id="container">
        <div class="form-container sign-up">
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <span>use your email for registration</span>
            <input 
              type="text" 
              placeholder="Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in">
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <span>Use your Email and Password</span>
            <input 
              type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password" placeholder="Password"  value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Sign in</button>
          </form>
        </div>
        <div class="toggle-container">
          <div class="toggle">
            <div class="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Login to your account</p>
              <button onClick={handleLoginClick} class="hidden" id="login">
                Sign In
              </button>
            </div>
            <div class="toggle-panel toggle-right">
              <h1>Hello, User!</h1>
              <p>
                Send a request to the admin for approval
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
