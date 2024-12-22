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
  const { token } = useAuth(); // Destructure `token` instead of `user`

  console.log('Logged-in Token:', token); // Debug token state

  return (
    <div>
      <Header />
      <Hero />
      {token ? (
        <>
          <Categories onSelectCategory={setSelectedCategory} />
          <Courses selectedCategory={selectedCategory} />
        </>
      ) : (
        <p className="text-center text-red-500 mt-4">
          Please log in to view the courses.
        </p>
      )}
      <Footer />
    </div>
  );
};

export default Home;
