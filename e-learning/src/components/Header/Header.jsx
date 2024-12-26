import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '/Users/mohamed3wes/Final-e-learning-project/E-learning-platform/e-learning/src/components/Contexts/AuthContext.jsx'; // Correct import for useAuth

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">
          <Link to="/">E-Learn</Link>
        </h1>
        <nav>
          <ul className="flex space-x-6 items-center">
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/cart-enrollments" className="text-indigo-600 hover:text-indigo-400">
                    <img src="/src/assets/react.svg" alt="Cart Icon" className="w-6 h-6" />
                  </Link>
                </li>
                <li>
                  <span className="text-gray-700">Hi, {user?.username || 'User'}</span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-400 font-bold"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-indigo-600 hover:text-indigo-400">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="text-indigo-600 hover:text-indigo-400">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
