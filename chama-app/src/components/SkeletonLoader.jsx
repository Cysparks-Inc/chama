import React from 'react';

const SkeletonLoader = ({ count, width, height }) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="skeleton"
          style={{
            width: width || '100%',
            height: height || '20px',
            backgroundColor: '#e0e0e0',
            marginBottom: '10px',
          }}
        />
      ))}
    </div>
  );
};

export default SkeletonLoader;


