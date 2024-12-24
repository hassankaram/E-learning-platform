import React from 'react';

const CourseProgress = ({ progressData }) => {
  if (!progressData) return <p>No progress data</p>;

  return (
    <div>
      <h2>Course Progress</h2>
      <p>Status: {progressData.is_completed ? 'Completed' : 'In Progress'}</p>
      {progressData.completed_at && (
        <p>Completed at: {progressData.completed_at}</p>
      )}
    </div>
  );
};

export default CourseProgress;