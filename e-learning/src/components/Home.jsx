import React, { useState } from 'react';
import Header from './Header/Header';
import Hero from './Hero/Hero';
import Courses from './Courses/Courses';
import Footer from './Footer/Footer';
import Categories from './Courses/Categories';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('Data Science'); // Default category

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header and Hero */}
      <Header />
      <Hero />

      {/* Categories Selection */}
      <Categories onSelectCategory={setSelectedCategory} />

      {/* Courses Section */}
      <Courses selectedCategory={selectedCategory} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;

