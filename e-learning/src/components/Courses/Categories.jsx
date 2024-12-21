import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/categories/')
      .then(response => {
        console.log('Fetched Categories:', response.data); // Debugging fetched data
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error); // Debug error
        setError(error);
      });
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="flex gap-4 overflow-x-auto max-w-full scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100">
        {categories.map(category => (
          <div
            key={category.id}
            className="cursor-pointer bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-800 rounded-lg px-4 py-2 shadow-md text-center w-32"
            onClick={() => {
              console.log('Selected Category:', category.name); // Debug selected category
              onSelectCategory(category.name);
            }}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
