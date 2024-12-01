import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '/Users/mohamed3wes/e-learning/e-learning/src/components/Contexts/AuthContext.jsx';
import { CategoryProvider } from './Contexts/CategoryContext';
import Home from './Home';
import Signup from './Authentication/Signup';
import Login from './Authentication/Login';

const App = () => {
  return (
    <AuthProvider>
      <CategoryProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </CategoryProvider>
    </AuthProvider>
  );
};

export default App;
