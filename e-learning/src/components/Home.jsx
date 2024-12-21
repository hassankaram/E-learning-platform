// filepath: /src/components/Home.jsx
import React, { useState } from 'react';
import { useAuth } from '/Users/mohamed3wes/new e-learning/E-learning-platform/e-learning/src/components/Contexts/AuthContext.jsx';
import Header from './Header/Header';
import Hero from './Hero/Hero';
import Courses from './Courses/Courses';
import Footer from './Footer/Footer';
import Categories from './Courses/Categories';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('Data Science');
  const { user } = useAuth(); // Destructure `user` from useAuth once

  console.log('Logged-in User:', user); // Debug user state

  return (
    <div>
      <Header />
      <Hero />
      {(
        <>
          <Categories onSelectCategory={setSelectedCategory} />
          <Courses selectedCategory={selectedCategory} />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;
