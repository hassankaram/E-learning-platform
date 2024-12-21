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
        const response = await axios.get('http://127.0.0.1:8000/api/courses/');
        const filteredCourses = response.data.filter(
          (course) => course.category_name === selectedCategory
        );
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
