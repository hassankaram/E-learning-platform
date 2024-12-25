import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData); // Simulate login with context
    console.log('Login Data:', formData);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-indigo-700 text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
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
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-indigo-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-100 text-indigo-700 py-2 rounded-lg shadow-md hover:bg-indigo-200 transition font-bold"
        >
          Login
        </button>
        <button
          type="button"
          className="mt-4 text-indigo-500 hover:underline text-sm w-full text-center"
        >
          Forgot Password?
        </button>
      </form>
    </div>
  );
};

export default Login;
