import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token'));
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Helper function to update tokens and user in localStorage and state
  const updateTokensAndUser = (key, refresh, userData) => {
    console.log('Updating tokens and user:', { key, refresh, userData });

    if (key) {
      localStorage.setItem('token', key);
      setToken(key);
    }

    if (refresh) {
      localStorage.setItem('refresh_token', refresh);
      setRefreshToken(refresh);
    }

    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }

    // Ensure no unintended clearing of storage
    if (!key && !refresh && !userData) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      setToken(null);
      setRefreshToken(null);
      setUser(null);
    }
  };

  // Login function: Save token, refresh token, and user
  const login = (response) => {
    const { key, refresh, user: userData } = response;
    updateTokensAndUser(key, refresh, userData);
    console.log('Logged-in Token:', key);
  };

  // Logout function: Clear token, refresh token, and user
  const logout = () => {
    updateTokensAndUser(null, null, null);
  };

  // Fetch user profile using the token
  const fetchUserProfile = async (authToken) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/profile/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched User Profile:', data);
        return data;
      }
      console.error('Failed to fetch user profile. Status:', response.status);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
    return null;
  };

  // Refresh token function
  const refreshAuthToken = async () => {
    if (!refreshToken) {
      console.warn('No refresh token available.');
      return null;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/refresh/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Token refreshed:', data);
        updateTokensAndUser(data.access, refreshToken, user);
        return data.access;
      }
      console.error('Failed to refresh token. Status:', response.status);
    } catch (error) {
      console.error('Error refreshing token:', error);
    }

    logout(); // Logout if refresh fails
    return null;
  };

  // Initialize authentication on mount
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('Initializing auth...');
      const storedToken = localStorage.getItem('token');
      const storedRefreshToken = localStorage.getItem('refresh_token');

      if (storedToken) {
        const userData = await fetchUserProfile(storedToken);
        if (userData) {
          setUser(userData);
        } else {
          console.log('Failed to fetch user profile. Attempting to refresh token...');
          const newToken = await refreshAuthToken();
          if (newToken) {
            const refreshedUser = await fetchUserProfile(newToken);
            if (refreshedUser) {
              setUser(refreshedUser);
            } else {
              console.error('Failed to fetch user profile after refreshing token.');
              logout();
            }
          } else {
            console.error('Failed to refresh token.');
            logout();
          }
        }
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ token, refreshToken, user, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
