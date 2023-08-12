import React from 'react';

const YAxis = ({yAxisArray,axisHeight}) => {
  return (
    <div className="y-axis" style={{ height: axisHeight}}>
      {yAxisArray.map((number, index) => (
        <div key={index} style={{ lineHeight: `${axisHeight/20}px` }}>{number}</div>
      ))}
    </div>
  );
};

export default YAxis;
