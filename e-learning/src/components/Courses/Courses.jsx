import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';

const Courses = ({ selectedCategory }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/courses');
        const filteredCourses = response.data.filter(course => course.category === selectedCategory);
        setCourses(filteredCourses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [selectedCategory]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">{selectedCategory} Courses</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.length > 0 ? (
          courses.map((course) => <CourseCard key={course.id} title={course.name} />)
        ) : (
          <p className="text-gray-600">No courses available for the selected category.</p>
        )}
      </div>
    </section>
  );
};

export default Courses;