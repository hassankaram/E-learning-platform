import React from 'react';

const CourseCard = ({ title }) => {
  return (
    <div className="bg-indigo-100 p-4 rounded-lg shadow-md w-64 h-40 flex items-center justify-center">
      <h3 className="text-lg font-bold">{title}</h3>
    </div>
  );
};

export default CourseCard;
