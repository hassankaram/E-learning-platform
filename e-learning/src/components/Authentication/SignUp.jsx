import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/registration/', formData);
      setSuccessMessage('Signup successful! Redirecting to login page...');
      setFormData({ username: '', email: '', password1: '', password2: '' });

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 500) {
          setErrorMessage('Internal server error. Please contact support.');
        } else if (status === 400) {
          const formattedErrors = Object.entries(data)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join('. ');
          setErrorMessage(`Signup failed: ${formattedErrors}`);
        } else {
          setErrorMessage('An unexpected error occurred.');
        }
      } else {
        setErrorMessage('Unable to connect to the server. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-indigo-700 text-center mb-4">Signup</h2>
      {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium text-indigo-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your username"
            required
            autoComplete="username"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-indigo-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your email"
            required
            autoComplete="email"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-indigo-700">Password</label>
          <input
            type="password"
            name="password1"
            value={formData.password1}
            onChange={handleChange}
            className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your password"
            required
            autoComplete="new-password"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-indigo-700">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Confirm your password"
            required
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-100 text-indigo-700 py-2 rounded-lg shadow-md hover:bg-indigo-200 transition font-bold"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
