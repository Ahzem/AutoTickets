import axios from 'axios';

export const setAuthToken = (token: string) => {
  localStorage.setItem('token', token);
  // Set default auth header for all requests
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const clearAuthToken = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
};