import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null); // Add user state

  /**
   * Fetch user profile from /profile/ endpoint
   */
  const fetchUserProfile = async (token) => {
    console.log('Using Token:', token); // Debugging log
    try {
      const response = await fetch('http://127.0.0.1:8000/profile/', {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure the token is correctly formatted
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched User Profile:', data);
        return data;
      }
      console.error('Failed to fetch user profile. Status:', response.status);
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };
  

  /**
   * Login function: Save token and fetch user profile
   */
  const login = async (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);

    const userData = await fetchUserProfile(newToken);
    if (userData) {
      setUser(userData); // Store user details in context
    }
  };

  /**
   * Logout function: Clear token and user data
   */
  const logout = () => {
    setToken(null);
    setUser(null); // Clear user state
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
