import React from 'react';
import { useCategory } from './Contexts/CategoryContext';
import Header from './Header/Header';
import Hero from './Hero/Hero';
import Courses from './Courses/Courses';
import Footer from './Footer/Footer';
import Categories from './Courses/Categories';

const Home = () => {
  const { selectedCategory, setSelectedCategory } = useCategory();

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Header />
      <Hero />
      <Categories onSelectCategory={setSelectedCategory} />
      <Courses selectedCategory={selectedCategory} />
      <Footer />
    </div>
  );
};

export default Home;
