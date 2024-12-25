import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Data:', formData); // Replace with API logic
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-indigo-700 text-center mb-4">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium text-indigo-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your name"
            required
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
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
