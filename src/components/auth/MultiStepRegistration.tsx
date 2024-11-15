// src/components/MultiStepRegistration.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiBook, FiBriefcase, FiHome, FiLock, FiCalendar, FiCheckSquare } from 'react-icons/fi';
import '../../css/multistep.css';
import '../../index.css';

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  password: string;
  confirmPassword?: string;
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
  terms?: boolean;
}

const MultiStepRegistration: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    address: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    type: '',
    gender: '',
    tShirtSize: '',
    mealPreferences: '',
    company: '',
    university: '',
    studentId: '',
    employeeId: '',
    terms: false
  });
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = e.target instanceof HTMLInputElement ? e.target.checked : undefined;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.dateOfBirth || !formData.contactNumber || !formData.address) {
          setError('Please fill in all required fields');
          return false;
        }
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          setError('Please enter a valid email address');
          return false;
        }
        if (!formData.contactNumber.match(/^\d{10}$/)) {
          setError('Please enter a valid 10-digit phone number');
          return false;
        }
        break;
      case 2:
        if (!formData.type || !formData.mealPreferences || !formData.tShirtSize) {
          setError('Please select your type');
          return false;
        }
        break;
      case 3:
        if (!formData.type || (formData.type === 'student' && (!formData.university || !formData.studentId)) || (formData.type === 'employee' && (!formData.company || !formData.employeeId))) {
          setError('Please fill in all required fields');
          return false;
        }
        break;
      case 4:
        if (!formData.password || !formData.confirmPassword) {
            setError('Please fill in all required fields');
            return false;
          }
          if (!validatePassword(formData.password)) {
            setError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
            return false;
          }
          if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
          }
          if (!formData.terms) {
            setError('Please agree to the terms and conditions');
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

  const formattedData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    password: formData.password,
    contactNumber: formData.contactNumber,
    type: formData.type,
    gender: formData.gender || '',
    occupation: {
      [formData.type]: formData.type === 'student' 
        ? {
            university: formData.university,
            course: '',
            year: ''
          }
        : {
            company: formData.company,
            position: '',
            experience: ''
          }
    },
    tShirtSize: formData.tShirtSize || '',
    mealPreferences: formData.mealPreferences || '',
    address: {
      street: formData.address || '',
      city: '',
      state: '',
      zipCode: ''
    }
  };

  try {
    const response = await fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    navigate('/login', { 
      state: { message: 'Registration successful! Please login.' }
    });
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError('An error occurred during registration');
    }
  }
};

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            className="form-section"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <h2>Personal Information</h2>
            <div className="form-row">
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
            </div>
            <div className="form-group">
              <FiCalendar className="input-icon" />
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
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
              <FiHome className="input-icon" />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            className="form-section"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <h2>Event Preferences</h2>
            <div className="form-group">
              <FiCheckSquare className="input-icon" />
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select Your Gender</option>
                <option value="male">Man</option>
                <option value="female">Woman</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <FiBriefcase className="input-icon" />
              <select
                id='type'
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Your Role</option>
                <option value="student">Student</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            <div className="form-group">
              <FiCheckSquare className="input-icon" />
              <select
                id="mealPreferences"
                name="mealPreferences"
                value={formData.mealPreferences}
                onChange={handleInputChange}
              >
                <option value="">Select Meal Preference</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
            <div className="form-group">
              <FiCheckSquare className="input-icon" />
              <select
                id="tShirtSize"
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
            className="form-section"
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

      case 4:
        return (
          <motion.div
            className="form-section"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <h2>Create Password</h2>
            <div className="form-group">
              <FiLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <FiLock className="input-icon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group terms-checkbox">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="terms">
                I agree to the <Link to="/terms">terms and conditions</Link>
              </label>
            </div>
          </motion.div>
        );
    }
    setError('');
    return true;
  };

  return (
    <div className="registration-container">
      <div className="steps-indicator">
        {[1, 2, 3, 4].map((stepNumber) => (
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
              className='secondary-button'
              onClick={prevStep}
              whileTap={{ scale: 0.95 }}
            >
              Previous
            </motion.button>
          )}
          {step < 4 ? (
            <motion.button
              type="button"
              className='primary-button'
              onClick={nextStep}
              whileTap={{ scale: 0.95 }}
            >
              Next
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              className='primary-button'
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          )}
        </div>
      </form>
      <div className="signin-link">
        Already have an account? <Link to="/login">Sign in</Link>
      </div>
    </div>
  );
};

export default MultiStepRegistration;