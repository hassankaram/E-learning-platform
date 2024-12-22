import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Login function
  const login = (token) => {
    setToken(token);
    localStorage.setItem('token', token); // Persist token in localStorage
  };

  // Logout function
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Remove token from localStorage
  };

  // Initialize token from localStorage on mount
  const initializeToken = () => {
    try {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Error loading token from localStorage:', error);
      localStorage.removeItem('token'); // Clear corrupted data
    }
  };

  useEffect(() => {
    initializeToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
