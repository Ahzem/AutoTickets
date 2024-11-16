import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { FiZap, FiShield, FiHeadphones, FiUsers, FiAward, FiCheckCircle, FiSquare } from 'react-icons/fi';
import '../css/landing.css';
import '../index.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
    const { theme } = useTheme();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <div className={`landing-layout ${theme}`}>
      {/* Hero Section */}
      <section className="landing-container container hero">
        <div className="hero-content">
          <h1>AutoTickets</h1>
          <h2>Get Your Tickets Fast, Easy, and Secure!</h2>
          <p>Your all-in-one platform for seamless ticket bookings</p>
          <div className="button-group">
            <button className="primary-button" onClick={handleRegister}>
              Register Now
            </button>
            <button className="secondary-button" onClick={handleSignIn}>
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <div className="feature-icon">
            <FiZap />
          </div>
          <h3 className='feature-title'>Fast Booking</h3>
          <p className='feature-desc'>Book tickets in just a few clicks</p>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <FiSquare />
          </div>
          <h3 className='feature-title'>QR Ticket System</h3>
          <p className='feature-desc'>Digital tickets with secure QR codes</p>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <FiShield />
          </div>
          <h3 className='feature-title'>Secure Payments</h3>
          <p className='feature-desc'>Encrypted and safe transactions</p>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <FiHeadphones />
          </div>
          <h3 className='feature-title'>24/7 Support</h3>
          <p className='feature-desc'>Always here to help you</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-item">
          <FiUsers className="stat-icon" />
          <span className="stat-number">1M+</span>
          <span className="stat-label">Users</span>
        </div>
        <div className="stat-item">
          <FiAward className="stat-icon" />
          <span className="stat-number">500K+</span>
          <span className="stat-label">Tickets Sold</span>
        </div>
        <div className="stat-item">
          <FiCheckCircle className="stat-icon" />
          <span className="stat-number">99%</span>
          <span className="stat-label">Satisfaction</span>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 AutoTickets. All rights reserved.</p>
          <div className="footer-links">
            <a href="#" className="secondary-button">Privacy</a>
            <a href="#" className="secondary-button">Terms</a>
            <a href="#" className="secondary-button">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;