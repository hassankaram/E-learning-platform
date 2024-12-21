// filepath: /src/components/CartEnrollments.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/enrollments/');
        setEnrollments(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  if (loading) return <p>Loading enrollments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Enrolled Courses</h1>
      {enrollments.length === 0 ? (
        <p>You have not enrolled in any courses yet.</p>
      ) : (
        <ul className="space-y-4">
          {enrollments.map((course) => (
            <li
              key={course.id}
              className="bg-indigo-100 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-bold">{course.title}</h2>
                <p className="text-sm text-gray-700">{course.description}</p>
              </div>
              <span className="text-gray-500 text-sm">Price: ${course.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartEnrollments;
