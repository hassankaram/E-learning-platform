// filepath: /src/components/Courses/EnrollButton.jsx
import React from 'react';
import axios from 'axios';

const EnrollButton = ({ courseId }) => {
  const handleEnroll = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/enroll/', { courseId });
      alert('Enrolled successfully!');
    } catch (error) {
      alert('Enrollment failed. Please try again.');
      console.error('Enrollment error:', error);
    }
  };

  return (
    <button
      onClick={handleEnroll}
      className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
    >
      Enroll Now
    </button>
  );
};

export default EnrollButton;
