import React from 'react';
import CourseCard from './CourseCard';

const courseData = {
  'Python': ['Python for Beginners', 'Advanced Python'],
  'C++': ['C++ Fundamentals', 'OOP in C++'],
  // Add more categories and courses here
};

const Courses = ({ selectedCategory }) => {
  const courses = courseData[selectedCategory] || [];

  return (
    <section className="bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">{selectedCategory} Courses</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.length > 0 ? (
          courses.map((course, index) => <CourseCard key={index} title={course} />)
        ) : (
          <p className="text-gray-600">No courses available for the selected category.</p>
        )}
      </div>
    </section>
  );
};

export default Courses;
