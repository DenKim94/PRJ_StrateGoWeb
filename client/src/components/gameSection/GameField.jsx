import React, {useState, useEffect} from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './GameField.css'
import * as parameters from '../../game-logic/parameters.js';
import SingleField from './SingleField';
import FigureStorage from './FigureStorage';
import DefeatedFigureStorage from './DefeatedFigureStorage';
import { figProperties } from '../../game-logic/parameters.js';
import * as helperFcn from '../functions/helperFunctions.js'
import * as gameLogic from '../../game-logic/gameLogic.js'
import YAxis from './yAxis';
import XAxis from './xAxis';

/**
 * React component representing the game field and associated game components.
 * 
 * @component
 * @param {Object} props - The component's properties.
 * @param {Object} props.gameFieldSettings - Settings for the game field, including dimensions, colors, and non-playable field coordinates.
 * @param {Object} props.gameSettings - Settings for the overall game.
 * @param {Object} props.buttonStates - States related to game buttons.
 * @param {Function} props.setStartButtonState - Function to set the state of the Start Button.
 * @returns {JSX.Element} Returns the JSX element representing the game field and its components.
 */

function GameField({gameFieldSettings, gameSettings, buttonStates, setStartButtonState})
  {

    // TO-DO: Auslagern der Inputparameter über 'useContext' [23.12.2023]

     /* ********************************************************************* */
    const fieldWidth = gameFieldSettings.fieldWidth;
    const fieldHeight = gameFieldSettings.fieldHeight;
    const backgroundColor = gameFieldSettings.backgroundColor;
    const coordsNonPlayableFields = gameFieldSettings.coordsNonPlayableFields; 
    const colorNonPlayableFields = gameFieldSettings.colorNonPlayableFields;
    const prefixSingleFieldID = gameFieldSettings.prefixID;
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
  
    // Create an array (Strings) for the x-Axis 
    const xAxisLetters = Array.from({ length: 10 }, (_, index) =>
      String.fromCharCode(65 + index)
    );

    // Create an array (Numbers) for the y-Axis 
    const yAxisNumbers = (Array.from({ length: 10 }, (_, index) => 
    (10 - index)));
    
    // Merging the axis arrays into a new array of coordinates 
    let fieldCoordinates = helperFcn.getCoordinatesArray(xAxisLetters,yAxisNumbers, gameSettings.isPlayer1);
    
    // Get color of the player
    const playerColor = helperFcn.getColorOfPlayer(gameSettings);

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
    const playerFigures = helperFcn.getFiguresOfPlayer(figProperties, playerColor)
    const [figureStorageState,setFigureStorageState] = useState([...playerFigures]); 

    /* *** State as array to store defeated game figures *** */
    const [defeatedFigureStorage,setDefeatedFigureStorage] = useState([]); 

    /* Checking values of parameters in 'debugMode' */
    if(parameters.genCfg.debugMode){
      console.log("################### Component: GameField #####################");
      console.log(">> Settings 'gameFieldStruct': ", gameFieldSettings);
      console.log(">> sizeSingleField [px]: ", sizeSingleField);
      console.log(">> Array 'fieldCoordinates': ", fieldCoordinates);
      console.log(">> playerColor: ", playerColor);
      console.log(">> playerFigures: ", playerFigures);
      console.log(">> State 'gameFieldState': ", gameFieldState);
      console.log(">> State 'figureStorageState': ", figureStorageState);
      console.log(">> defeatedFigureStorage: ", defeatedFigureStorage)
      console.log(">> Game states: ", gameSettings);
      console.log(" #############################################################");
    }
    // Enable the Start Button to start the game, when the figure storage list is empty
    useEffect(() => {
      const updateStartButton = () => {
        // Überprüfen, ob der Start-Button aktiviert werden soll
        if (figureStorageState.length === 0 && buttonStates.counterUsedStartButton < 1) {
          setStartButtonState((prevStates) => ({
            ...prevStates,
            disabledStartButton: false,
          }));
        }
      }; 
      updateStartButton()
    }, [figureStorageState, buttonStates.counterUsedStartButton, setStartButtonState]);

    /* *************** Rendering the game components *************** */ 
    return(
      <DragDropContext onDragEnd={(result) => {
        const updatedStates = gameLogic.handleDragDrop(result, gameFieldState, figureStorageState,prefixSingleFieldID,gameSettings);
        if (updatedStates) {
          // Get updated states from 'updatedStates'
          const { gameFieldState: newGameFieldState, figureStorageState: newFigureStorageState} = updatedStates;
  
          setGameFieldState(newGameFieldState);         // Update the State of the game field 
          setFigureStorageState(newFigureStorageState); // Update the State of the figure storage
        }        
      }}>
         <div className = "dnd-container" style={parameters.styleDnDContainer}>
          <div className = "game-field-container" style={parameters.styleGameFieldContainer}>
              {/* *** y-Axis *** */}
              <YAxis yAxisArray = {yAxisNumbers} 
                     axisHeight = {fieldHeight}
                     gameStates = {gameSettings} 
                     axisStyle = {parameters.styleYAxis}/>
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
                    {(provided,snapshot) => (             
                      <div
                        style={fieldProps.style}
                        key={index}
                        className={"single-field"}
                        ref={provided.innerRef} 
                        {...provided.droppableProps}
                      >
                        <SingleField fieldState={fieldProps} idx = {index} snapshot = {snapshot}/>
                        {provided.placeholder}                        
                      </div>
                    )}
                    </Droppable> 
                  )
                })}
              </div>
              {/* *** x-Axis *** */}                   
              <XAxis xAxisArray = {xAxisLetters} 
                     singleFieldWidth = {sizeSingleField} 
                     gameStates = {gameSettings} 
                     axisStyle={parameters.styleXAxis}/>
          </div>
            <FigureStorage figStateArray = {figureStorageState} />    
            <DefeatedFigureStorage defFigStateArray = {defeatedFigureStorage}
                                   setDefState = {setDefeatedFigureStorage}
                                   figStorageState = {figureStorageState} />
        </div> 
      </DragDropContext>
      )     
};

export default GameField;
