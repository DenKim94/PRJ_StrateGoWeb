import React from 'react';
/* Component of the x-Axis */
const XAxis = ({xAxisArray,singleFieldWidth,gameStates}) => {
  if (!gameStates.isPlayer1){
    xAxisArray = xAxisArray.reverse();
  }
  return (
    <div className="x-axis">
      {xAxisArray.map((letter, index) => (
        <div key={index} style={{ width: singleFieldWidth, textAlign: 'center' }}>{letter}</div>
      ))}
    </div>
  );
};

export default XAxis;
