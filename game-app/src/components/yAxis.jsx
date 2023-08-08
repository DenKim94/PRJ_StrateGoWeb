import React from 'react';

const YAxis = ({yAxisArray}) => {
  return (
    <div className="y-axis" style={{ height: 700}}>
      {yAxisArray.map((number, index) => (
        <div key={index} style={{ lineHeight: `${35}px` }}>{number}</div>
      ))}
    </div>
  );
};

export default YAxis;
