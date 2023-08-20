import React from 'react';
import './GameField.css'
import * as helperFcn from './functions/helperFunctions.js'
import YAxis from './yAxis';
import XAxis from './xAxis';

/* ******************************************************************* */ 
class GameField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayFigures: [],  // Array to add game figures
      gameFieldProps: []    // Array to store game field properties
    };
  }
  
  // Helper function to update the array/properties of 'gameFieldProps'
  updateStateFieldProps = (newFieldProps) => {
      this.setState(prevState => ({
      gameFieldProps: prevState.gameFieldProps.concat(newFieldProps),
    }));
  };

  render() {
    const {fieldWidth, fieldHeight, backgroundColor, coordsNonPlayableFields, colorNonPlayableFields} = this.props;
    const sizeSingleField = Math.abs(fieldWidth)/10;
    const fieldStyle = {
      width: fieldWidth,
      height: fieldHeight,
      display: 'grid',
      /* Separate the game field into single patterns */
      gridTemplateColumns: `repeat(10, ${sizeSingleField}px)`,
      gridTemplateRows: `repeat(10, ${sizeSingleField}px)`
    };

    /* Create a String-Array (Letters) for the x-Axis */
    const xAxisLetters = Array.from({ length: 10 }, (_, index) =>
      String.fromCharCode(65 + index)
    );

    /* Create a String-Array (Numbers) for the y-Axis */
    const yAxisNumbers = (Array.from({ length: 10 }, (_, index) => 
    String(index + 1))).reverse();
    
    /* Merging the axis arrays into a new array of coordinates */
    const fieldCoordinates = helperFcn.getCoordinatesArray(xAxisLetters,yAxisNumbers);

    /* Array to store game field properties */
    const gameFieldProps = []; 

    /* Create and render the game elements (axis and game fields) */ 
    return (
        <div className="game-field-container">
          {/* *** y-Axis *** */}
          <div>
              <YAxis yAxisArray = {yAxisNumbers} axisHeight = {fieldHeight}/>
          </div>
          {/* *** The game field *** */}
          <div className="game-field" style={fieldStyle}>
            {/* Create single game fields */}
            {Array.from({ length: 100 }).map((_, index) => {
              const singleFieldProps = helperFcn.setProps4SingleField(
                index,
                fieldCoordinates[index],
                sizeSingleField,
                backgroundColor
              );
              /* Define non playable fields */
              helperFcn.setNonPlayableFields(singleFieldProps,
                fieldCoordinates[index],
                coordsNonPlayableFields,
                colorNonPlayableFields);

              /* Add Object 'singleFieldProps' to Array 'gameFieldProps' */
              helperFcn.updateGameFieldProps(gameFieldProps,singleFieldProps)

              /* Create and render the elements with specific coordinates */    
              return (
                <div
                  key={index}
                  className={"singleField_"+index}
                  style={singleFieldProps.style}
                  data-coordinates={`${fieldCoordinates[0]},
                  ${fieldCoordinates[1]},
                  ${singleFieldProps.isPlayable}`} 
                ></div>
              )
            })}
            
          </div>

          {/* *** x-Axis *** */}         
          <div>           
              <XAxis xAxisArray = {xAxisLetters} singleFieldWidth = {sizeSingleField} />
          </div> 
        </div>
      );
  }
}

/* Default values of properties (if not predefined) */
GameField.defaultProps = {
    fieldWidth: 500,
    fieldHeight: 500,
    backgroundColor: 'lightgoldenrodyellow',
    coordsNonPlayableFields:[                
    ["C","5"],["C","6"],
    ["D","5"],["D","6"],
    ["G","5"],["G","6"],
    ["H","5"],["H","6"],
    ],
    colorNonPlayableFields: 'brown' 
  };

export default GameField;
