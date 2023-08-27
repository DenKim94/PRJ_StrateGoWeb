import React, {useState} from 'react';
import './GameField.css'
import * as helperFcn from './functions/helperFunctions.js'
import YAxis from './yAxis';
import XAxis from './xAxis';
import { gameFieldStruct } from './parameters';
import { genCfg } from './parameters';

/* *********************** Game Field Component ************************ */ 
const GameField = ({
  fieldWidth = gameFieldStruct.fieldWidth, 
  fieldHeight = gameFieldStruct.fieldHeight, 
  backgroundColor = gameFieldStruct.backgroundColor, 
  coordsNonPlayableFields = gameFieldStruct.coordsNonPlayableFields, 
  colorNonPlayableFields = gameFieldStruct.colorNonPlayableFields
  }) => {
    const sizeSingleField = Math.abs(fieldWidth)/10;
    const fieldStyle = {
      width: fieldWidth,
      height: fieldHeight,
      display: 'grid',
      /* Separate the game field into single patterns */
      gridTemplateColumns: `repeat(10, ${sizeSingleField}px)`,
      gridTemplateRows: `repeat(10, ${sizeSingleField}px)`
    };

    /* State as array to store and set game figure properties */
    const arrayFigures = useState([]);
    /* state as array to store and set game field properties */
    const gameFieldProps = useState([]);

    /* Helper function to update the array/properties of 'gameFieldProps' */
    const updateStateGameField = (newProps) => {
      gameFieldProps.push(newProps); // Update array
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
    
    /* Set properties of a single field and store them in an array */
    const updatedStateArray = [];
    Array.from({ length: 100 }).map((_, index) => {
      const singleFieldProps = helperFcn.setProps4SingleField(
        index,
        fieldCoordinates[index],
        sizeSingleField,
        backgroundColor
      );
      /* Define non playable fields and modify the properties */
      helperFcn.setNonPlayableFields(singleFieldProps,
        fieldCoordinates[index],
        coordsNonPlayableFields,
        colorNonPlayableFields);
      
        return(updatedStateArray.push(singleFieldProps))
    })

    /* Update State of 'gameFieldProps' */ 
      updateStateGameField(updatedStateArray);
      
    /* Checking parameters in 'debugMode' */
    if(genCfg.debugMode){
      console.log("################### Component: GameField #####################");
      console.log(">> Settings 'gameFieldStruct': ", gameFieldStruct);
      console.log(">> sizeSingleField: ", sizeSingleField);
      console.log(">> Array 'fieldCoordinates': ", fieldCoordinates);
      console.log(">> State 'arrayFigures': ", arrayFigures);
      console.log(">> State 'gameFieldProps': ", gameFieldProps);
      
      console.log(" #############################################################");
    }
    /* Create and render the game elements (axis and game fields) */ 
    return(
        <div className="game-field-container">
          {/* *** y-Axis *** */}
          <div>
              <YAxis yAxisArray = {yAxisNumbers} axisHeight = {fieldHeight}/>
          </div>
          {/* *** The game field *** */}
          <div className="game-field" style={fieldStyle}>
            {/* Create single game fields */}
            {updatedStateArray.map((obj, index) => {
              /* Create and render single field elements with specific coordinates */    
              return (
                <div
                  key={index}
                  className={"singleField_"+index}
                  style={updatedStateArray[index].style}
                  data-coordinates={`${updatedStateArray[index].pos_x},
                  ${updatedStateArray[index].pos_y},
                  ${updatedStateArray[index].isPlayable}`} 
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

export default GameField;
