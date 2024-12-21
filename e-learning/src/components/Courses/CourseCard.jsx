import React from 'react';
import EnrollButton from './EnrollButton';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-indigo-100 p-4 rounded-lg shadow-md w-64 h-40 flex flex-col justify-between">
      <h3 className="text-lg font-bold truncate">{course.title}</h3>
      {course.description && (
        <p className="text-sm text-gray-700 line-clamp-2">{course.description}</p>
      )}
      <EnrollButton courseId={course.id} />
    </div>
  );
};

export default CourseCard;
