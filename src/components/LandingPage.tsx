import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiUsers, FiCalendar } from 'react-icons/fi';
import eventConfig from '../config/eventConfig.json';

const LandingPage: React.FC = () => {
  return (
    <motion.div
      className="landing-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <nav className="landing-nav">
        <img src={eventConfig.logoPath} alt="Logo" className="nav-logo" />
        <div className="nav-links">
          <Link to="/signin" className="nav-link">Sign In</Link>
          <Link to="/signup" className="nav-button">Get Started</Link>
        </div>
      </nav>

      <main className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          <h1>{eventConfig.eventName}</h1>
          <p className="hero-tagline">{eventConfig.tagline}</p>
          <div className="hero-actions">
            <Link to="/signup" className="cta-button">Register Now</Link>
            <Link to="/about" className="secondary-button">Learn More</Link>
          </div>
        </motion.div>

        <div className="feature-grid">
          <div className="feature-card">
            <FiUsers className="feature-icon" />
            <h3>Networking</h3>
            <p>Connect with industry professionals</p>
          </div>
          <div className="feature-card">
            <FiCalendar className="feature-icon" />
            <h3>Events</h3>
            <p>Access exclusive events</p>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default LandingPage;