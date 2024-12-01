import React from 'react';

const categories = [
  'Data Science', 'Python', 'C++', 'C', 'Java', 'JavaScript', 
  'ChatGPT Prompting', 'Web Dev', 'Back End', 'Web Design', 
  'Flutter', 'React', 'React Native', 'VueJS', 'NextJS', 
  'Database', 'MySQL'
];

const Categories = ({ onSelectCategory }) => {
  return (
    <section className="bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      
      <div className="overflow-x-auto whitespace-nowrap p-4 bg-white rounded-lg shadow-lg scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200">
        <div className="inline-flex space-x-4">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => onSelectCategory(category)} // Pass selected category
              className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg shadow-md hover:bg-indigo-200 transition"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
// import React, { useState } from 'react';
// import Categories from '/Users/mohamed3wes/e-learning/e-learning/src/components/Courses/Courses.jsx';
// import Courses from '/Users/mohamed3wes/e-learning/e-learning/src/components/Courses/Categories.jsx';

// const Home = () => {
//   const [selectedCategory, setSelectedCategory] = useState('Data Science'); // Default category

//   return (
//     <div>
//       {/* Render Categories */}
//       <Categories onSelectCategory={setSelectedCategory} />
      
//       {/* Render Courses based on selected category */}
//       <Courses selectedCategory={selectedCategory} />
//     </div>
//   );
// };

// export default Home;
