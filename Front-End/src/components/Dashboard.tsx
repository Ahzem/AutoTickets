// src/components/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { useTheme } from '../hooks/useTheme';
import { FiCalendar, FiUser, FiSettings, FiLogOut, FiEdit } from 'react-icons/fi';
import '../css/dashboard.css';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    return nameParts.map(part => part.charAt(0)).join('');
  };

  return (
    <div className={`dashboard-layout ${theme}`}>
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="user-profile">
          <div className="avatar">
            {user ? getInitials(user.name) : ''}
          </div>
          <h3>{user?.name || 'Guest'}</h3>
          <p>{user?.email || ''}</p>
        </div>
        
        <nav className="sidebar-nav">
          <button className="nav-item active">
            <FiCalendar /> Events
          </button>
          <button className="nav-item" onClick={() => navigate('/profile')}>
            <FiUser /> Profile
          </button>
          <button className="nav-item" onClick={() => navigate('/settings')}>
            <FiSettings /> Settings
          </button>
        </nav>

        <button className="logout-button" onClick={logout}>
          <FiLogOut /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome Back, {user?.name?.split(' ')[0] || 'Guest'}!</h1>
          <button className="theme-toggle">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </header>

        <div className="dashboard-content">
          <section className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-grid">
              <button 
                className="action-card"
                onClick={() => navigate('/event-registration')}
              >
                <FiCalendar className="action-icon" />
                <h3>Register for Event</h3>
                <p>Join upcoming events</p>
              </button>

              <button 
                className="action-card"
                onClick={() => navigate('/profile/edit')}
              >
                <FiEdit className="action-icon" />
                <h3>Update Profile</h3>
                <p>Manage your information</p>
              </button>
            </div>
          </section>

          <section className="upcoming-events">
            <h2>Your Upcoming Events</h2>
            <div className="event-list">
              {/* Add event cards here */}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;