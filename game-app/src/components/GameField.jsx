import React, {useState} from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './GameField.css'
import { gameFieldObj } from './parameters';
import { genCfg } from './parameters';
import SingleField from './SingleField';
import FigureStorage from './FigureStorage';
import { figProperties } from './parameters';
import * as helperFcn from './functions/helperFunctions.js'
import YAxis from './yAxis';
import XAxis from './xAxis';



/* *********************** Game Field Component ************************ */ 
function GameField({
  fieldWidth = gameFieldObj.fieldWidth, 
  fieldHeight = gameFieldObj.fieldHeight, 
  backgroundColor = gameFieldObj.backgroundColor, 
  coordsNonPlayableFields = gameFieldObj.coordsNonPlayableFields, 
  colorNonPlayableFields = gameFieldObj.colorNonPlayableFields,
  prefixSingleFieldID = gameFieldObj.prefixID,
  gameSettings,
  })
  {
    /* ********************************************************************* */
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
    
    /* ********************************************************************* */
    /* Set properties of a single field and store them in an array */
    const updatedStateArray = [];
    Array.from({ length: 100 }).map((_, index) => {
      const singleFieldProps = helperFcn.setProps4SingleField(
        prefixSingleFieldID,
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

    /* *** State as array to store and set game field properties *** */
    const [gameFieldState, setGameFieldState] = useState([...updatedStateArray]); 
    /* *** State as array to store and set game figure properties *** */
    const playerFigures = helperFcn.getFigures4Player(figProperties, gameSettings.colorPlayer)
    const [figureStorageState,setFigureStorageState] = useState([...playerFigures]); 
  
    
    /* Checking parameters in 'debugMode' */
    if(genCfg.debugMode){

      console.log("################### Component: GameField #####################");
      console.log(">> Settings 'gameFieldStruct': ", gameFieldObj);
      console.log(">> sizeSingleField: ", sizeSingleField);
      console.log(">> Array 'fieldCoordinates': ", fieldCoordinates);
      console.log(">> playerFigures: ", playerFigures);
      console.log(">> State 'gameFieldState': ", gameFieldState);
      console.log(">> Color of player: ", gameSettings.colorPlayer);
      console.log(" #############################################################");
    }
    /* *************** Rendering the game components *************** */ 
    return(
      <DragDropContext onDragEnd={(result) => {
        const updatedStates = helperFcn.handleDragDrop(result, gameFieldState, figureStorageState,prefixSingleFieldID,gameSettings);
        if (updatedStates) {
          // Get updated states from 'updatedStates'
          const { gameFieldState: newGameFieldState, figureStorageState: newFigureStorageState} = updatedStates;
  
          setGameFieldState(newGameFieldState);         // Update the State of the game field 
          setFigureStorageState(newFigureStorageState); // Update the State of the figure storage
        }        
      }}>
         <div className = "dnd-container">
          <div className="game-field-container">
              {/* *** y-Axis *** */}
              <YAxis yAxisArray = {yAxisNumbers} axisHeight = {fieldHeight}/>
              {/* *** The game field *** */}
              <div className="game-field" style={fieldStyle}>
                {/* Create single game fields */}
                {gameFieldState.map((fieldProps, index) => {
                  /* Create and render single field elements with specific coordinates */    
                  return (
                    <Droppable droppableId={`${prefixSingleFieldID}_${index}`} 
                    key={`${prefixSingleFieldID}_${index}`}
                    type = "FIGURE"
                    > 
                    {(provided) => (                  
                      <div
                        style={fieldProps.style}
                        key={index}
                        className={"single-field"}
                        ref={(ref) => {
                          provided.innerRef(ref);
                        }}
                        {...provided.droppableProps}
                      >
                        <SingleField fieldState={fieldProps} idx = {index}/>
                        {provided.placeholder}                        
                      </div>
                    )}
                    </Droppable> 
                  )
                })}
              </div>
              {/* *** x-Axis *** */}                   
              <XAxis xAxisArray = {xAxisLetters} singleFieldWidth = {sizeSingleField} />
          </div>
            {/* *** TO-DO: Figure Storage (Starting Position) *** */} 
            <FigureStorage figStateArray = {figureStorageState} />      
          </div> 
        </DragDropContext>
      )     
};

export default GameField;
