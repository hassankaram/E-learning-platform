import React from 'react';

const Hero = () => {
  return (
    <div className="text-center my-10">
      <h2 className="text-4xl font-extrabold text-gray-800">
        Learn Anytime, Anywhere
      </h2>
      <p className="mt-4 text-gray-600">
        Discover top courses and expand your knowledge from the comfort of your home.
      </p>
      <a
        href="#"
        className="mt-6 inline-block bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-500"
      >
        Browse Courses
      </a>
    </div>
  );
};

export default Hero;
