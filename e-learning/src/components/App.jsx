import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import Home from './Home';
import Signup from './Authentication/Signup';
import Login from './Authentication/Login';
import CartEnrollments from '/Users/mohamed3wes/Final-e-learning-project/E-learning-platform/e-learning/src/components/Courses/CartEnrollments.jsx'; // Import the new page
import Header from '/Users/mohamed3wes/Final-e-learning-project/E-learning-platform/e-learning/src/components/Header/Header.jsx'; // Import the Header component
import ErrorBoundary from './ErrorBoundaries';


const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart-enrollments" element={<CartEnrollments />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
