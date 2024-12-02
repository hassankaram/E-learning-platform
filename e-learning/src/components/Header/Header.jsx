import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">
          <Link to="/">E-Learn</Link>
        </h1>
        <nav>
          <ul className="flex space-x-6 items-center">
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
            <li>
              <a href="#" className="text-gray-700 hover:text-indigo-600">
                <img
                  src="/assets/shopping-cart.svg"
                  alt="Shopping cart"
                  className="w-6 h-6"
                />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
