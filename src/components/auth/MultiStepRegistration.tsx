// src/components/MultiStepRegistration.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiBook, FiBriefcase, FiHome } from 'react-icons/fi';
import '../css/multistep.css';

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contactNumber: string;
  type: string;
  gender?: string;
  tShirtSize?: string;
  mealPreferences?: string;
  address?: string;
  company?: string;
  university?: string;
  studentId?: string;
  employeeId?: string;
}

const MultiStepRegistration: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNumber: '',
    type: ''
  });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
          setError('Please fill in all required fields');
          return false;
        }
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          setError('Please enter a valid email address');
          return false;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters long');
          return false;
        }
        break;
      case 2:
        if (!formData.contactNumber || !formData.gender) {
          setError('Please fill in all required fields');
          return false;
        }
        break;
      case 3:
        if (!formData.type) {
          setError('Please select your type');
          return false;
        }
        break;
    }
    setError('');
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login', { state: { message: 'Registration successful! Please login.' } });
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch {
      setError('An error occurred during registration');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <h2>Basic Information</h2>
            <div className="form-group">
              <FiUser className="input-icon" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <FiUser className="input-icon" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <FiMail className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <FiUser className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <h2>Personal Details</h2>
            <div className="form-group">
              <FiPhone className="input-icon" />
              <input
                type="tel"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
                <label htmlFor="tShirtSize">T-Shirt Size</label>
              <select
              id='tShirtSize'
                name="tShirtSize"
                value={formData.tShirtSize}
                onChange={handleInputChange}
              >
                <option value="">Select T-Shirt Size</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">Extra Large</option>
              </select>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <h2>Role Selection</h2>
            <div className="form-group">
                <label htmlFor="type">Type</label>
              <select
                id='type'
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Type</option>
                <option value="student">Student</option>
                <option value="employee">Employee</option>
              </select>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <h2>{formData.type === 'student' ? 'Student Details' : 'Employment Details'}</h2>
            {formData.type === 'student' ? (
              <>
                <div className="form-group">
                  <FiBook className="input-icon" />
                  <input
                    type="text"
                    name="university"
                    placeholder="University/Institute"
                    value={formData.university}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="studentId"
                    placeholder="Student ID"
                    value={formData.studentId}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <FiBriefcase className="input-icon" />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="employeeId"
                    placeholder="Employee ID"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <h2>Additional Preferences</h2>
            <div className="form-group">
                <label htmlFor="mealPreferences">Meal Preferences</label>
              <select
                id='mealPreferences'
                name="mealPreferences"
                value={formData.mealPreferences}
                onChange={handleInputChange}
              >
                <option value="">Meal Preferences</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
            <div className="form-group">
              <FiHome className="input-icon" />
              <textarea
                name="address"
                placeholder="Home Address"
                value={formData.address}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange(e)}
              />
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="registration-container">
      <div className="steps-indicator">
        {[1, 2, 3, 4, 5].map((stepNumber) => (
          <div
            key={stepNumber}
            className={`step ${step >= stepNumber ? 'active' : ''}`}
          >
            {stepNumber}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        {error && <div className="error-message">{error}</div>}

        <div className="button-group">
          {step > 1 && (
            <motion.button
              type="button"
              onClick={prevStep}
              whileTap={{ scale: 0.95 }}
            >
              Previous
            </motion.button>
          )}
          {step < 5 ? (
            <motion.button
              type="button"
              onClick={nextStep}
              whileTap={{ scale: 0.95 }}
            >
              Next
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepRegistration;