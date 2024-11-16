// src/components/SignIn.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../hooks/AuthContext';
import { setAuthToken } from '../services/authService';
import '../css/signin.css';

interface LocationState {
  message?: string;
}

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();
  const state = location.state as LocationState;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.token && data.user) {
        setAuthToken(data.token);
        login(data.token, {
          ...data.user,
          name: `${data.user.firstName} ${data.user.lastName}`
        });
        
        const intendedPath = location.state?.from?.pathname || '/dashboard';
        navigate(intendedPath, { replace: true });
      } else {
        throw new Error('Invalid server response');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <motion.div
        className="signin-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1>AutoTickets</h1>
        <h2>Welcome Back!</h2>
        {state?.message && (
          <motion.div
            className="success-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {state.message}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              aria-label="Email address"
            />
          </div>

          <div className="form-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              aria-label="Password"
            />
          </div>

          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              role="alert"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            className={`primary-button ${isLoading ? 'loading' : ''}`}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        <div className="signup-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </div>

        <div className="additional-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/">Back to Home</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;