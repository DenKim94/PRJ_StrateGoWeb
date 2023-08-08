import React from 'react';

const XAxis = ({xAxisArray}) => {
  return (
    <div className="x-axis">
      {xAxisArray.map((letter, index) => (
        <div key={index} style={{ width: 70, textAlign: 'center' }}>{letter}</div>
      ))}
    </div>
  );
};

export default XAxis;
