import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Persist user in localStorage
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  // Initialize user from localStorage on mount
  const initializeUser = () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('user'); // Clear corrupted data
    }
  };

  useEffect(() => {
    initializeUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
