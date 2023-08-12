import React from 'react';

const XAxis = ({xAxisArray,singleFieldWidth}) => {
  return (
    <div className="x-axis">
      {xAxisArray.map((letter, index) => (
        <div key={index} style={{ width: singleFieldWidth, textAlign: 'center' }}>{letter}</div>
      ))}
    </div>
  );
};

export default XAxis;
