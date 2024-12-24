import React from 'react';

const Review = ({ review }) => {
  return (
    <div>
      <h4>{review.title || 'Review'}</h4>
      <p>{review.content || 'No content'}</p>
    </div>
  );
};

export default Review;