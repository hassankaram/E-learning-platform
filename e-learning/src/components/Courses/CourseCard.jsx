import React from 'react';

const CourseCard = ({ title }) => {
  return (
    <div className="bg-indigo-100 p-4 rounded-lg shadow-md w-64 h-40 flex items-center justify-center">
      {title}
    </div>
  );
};

export default CourseCard;
