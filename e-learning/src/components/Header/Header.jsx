import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">E-Learn</h1>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <a href="#" className="text-gray-700 hover:text-indigo-600">Login</a>
            </li>
            <li>
              <a href="#" className="text-gray-700 hover:text-indigo-600">Signup</a>
            </li>
            <li>
              {/* Cart Icon */}
              <a href="#" className="text-gray-700 hover:text-indigo-600">
                <img
                  src="/assets/shopping-cart.svg"
                  alt="Cart"
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
