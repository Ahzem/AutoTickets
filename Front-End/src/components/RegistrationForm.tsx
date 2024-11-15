import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiDollarSign, FiSun, FiAward, FiInfo, FiUser, FiMail, FiPhone, FiUploadCloud } from 'react-icons/fi';
import eventConfig from '../config/eventConfig.json';
import { useTheme } from '../hooks/useTheme';
import '../css/styles.css';

const RegistrationForm: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [notification, setNotification] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProgress(30);

    try {
      const formData = new FormData(e.currentTarget);
      setProgress(60);

      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('Response:', result);

      setProgress(90);
      if (response.ok && result.success) {
        setNotification('Registration successful! Check your email.');
        if (formRef.current) {
          formRef.current.reset();
        }
        setFilePreview(null);
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        setNotification(error.message || 'Registration failed. Please try again.');
      } else {
        setNotification('Registration failed. Please try again.');
      }
    } finally {
      setProgress(100);
      setTimeout(() => setProgress(0), 1000);

      // Hide notification after 5 seconds
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <>
      <div className="gradient-flashes">
        <div className="gradient-flash flash-1" />
        <div className="gradient-flash flash-2" />
        <div className="gradient-flash flash-3" />
      </div>

      <motion.div 
        className={`registration-container ${theme}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button 
          onClick={toggleTheme} 
          className="theme-toggle"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiSun className="theme-icon" /> Theme
        </motion.button>

        {progress > 0 && (
          <motion.div 
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        )}

        <img src={eventConfig.logoPath} alt={eventConfig.eventName} className="logo" loading="lazy" />
        
        <h1>{eventConfig.eventName}</h1>
        <div className="tagline">
          <FiAward className="tagline-icon" />
          <p>{eventConfig.tagline}</p>
        </div>
        
        <section className="event-details">
          <div className="info-section">
            <FiInfo className="description-icon" />
            <p className="description">{eventConfig.description}</p>
          </div>
          
          <div className="event-info">
            <div className="info-item">
              <FiCalendar className="info-icon" />
              <div>
                <h3>Date</h3>
                <p>{eventConfig.date}</p>
              </div>
            </div>
            
            <div className="info-item">
              <FiClock className="info-icon" />
              <div>
                <h3>Time</h3>
                <p>{eventConfig.time}</p>
              </div>
            </div>

            <div className="info-item">
              <FiMapPin className="info-icon" />
              <div>
                <h3>Location</h3>
                <p>{eventConfig.location}</p>
                <p className="venue-address">
                  {`${eventConfig.venue.address}, ${eventConfig.venue.city}`}
                </p>
              </div>
            </div>

            <div className="info-item">
              <FiDollarSign className="info-icon" />
              <div>
                <h3>Price</h3>
                <p>Regular: {eventConfig.ticketPrice}</p>
                {/* <p className="early-bird">Early Bird: {eventConfig.earlyBirdPrice}</p> */}
              </div>
            </div>
          </div>
        </section>
      
        <form onSubmit={handleSubmit} ref={formRef} encType='multipart/form-data'>
          <motion.div 
            className="form-group"
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FiUser className="input-icon" />
            <input 
              type="text" 
              name="fullName" 
              required 
              placeholder="Full Name"
              pattern="^[a-zA-Z\s]{2,}$"
              title="Please enter your full name (minimum 2 characters)"
            />
          </motion.div>
          
          <motion.div 
            className="form-group"
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FiMail className="input-icon" />
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="Email Address"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Please enter a valid email address"
            />
          </motion.div>

          <motion.div 
            className="form-group"
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FiPhone className="input-icon" />
            <input 
              type="tel" 
              name="contactNumber" 
              required 
              placeholder="Contact Number"
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
            />
          </motion.div>

          <motion.div 
            className={`form-group file-upload ${filePreview ? 'has-file' : ''}`}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FiUploadCloud className="input-icon" />
            <input
              type="file"
              name="paymentProof"
              required
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              title="Upload proof of payment"
              placeholder="Upload proof of payment"
            />
            <label>{filePreview ? 'Change File' : 'Choose File'}</label>
            {filePreview && (
              <div className="file-preview">
                <img src={filePreview} alt="Preview" />
              </div>
            )}
          </motion.div>

          <motion.button
            type="submit"
            className="submit-button"
            whileTap={{ scale: 0.98 }}
          >
            Register Now
          </motion.button>
        </form>

        <AnimatePresence>
          {notification && (
            <motion.div 
              className={`notification ${notification ? 'show' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              {notification}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default RegistrationForm;