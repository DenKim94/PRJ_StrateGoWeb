import React, {useState, useEffect} from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ToastContainer, toast } from 'react-toastify';
import './GameField.css'
import * as parameters from '../../game-logic/parameters.js';
import SingleField from './SingleField';
import FigureStorage from './FigureStorage';
import DefeatedFigureStorage from './DefeatedFigureStorage';
import { useButtonStates } from '../context/ButtonStatesContext.js';
import { useGameStates } from '../context/GameStatesContext.js';
import { useScoutStates } from '../context/ScoutStatesContext.js';
import { useOpponentStates } from '../context/OpponentStatesContext.js';
import { useChannelStates } from '../context/ChannelStatesContext.js';
import { useChatContext } from 'stream-chat-react';
import { figProperties } from '../../game-logic/parameters.js';
import * as helperFcn from '../functions/helperFunctions.js'
import * as gameLogic from '../../game-logic/gameLogic.js'
import YAxis from './yAxis';
import XAxis from './xAxis';

/**
 * React component representing the game field and associated game components.
 * 
 * @component
 * @param {Object} parameters - Object with specific parameters for the component
 * @param {Object} gameFieldSettings - Settings for the game field, including dimensions, colors, and non-playable field coordinates.
 * @returns {JSX.Element} Returns the JSX element representing the game field and its components.
 */

function GameField({ gameFieldSettings = parameters.gameFieldObj })
  {
    const { buttonStates, setButtonStates } = useButtonStates();
    const { scoutStates, setScoutStates } = useScoutStates();
    const { opponentStates } = useOpponentStates();
    const { channelStates } = useChannelStates();
    const { client } = useChatContext();
    const { gameStates } = useGameStates();

    // States to provide updates of moved figures to each player
    const [movedFigure, setMovedFigure] = useState( 
        { 
            player: null,
            figureProps: null,
            source: null,
            destination: null,
        }
    );

    // Set player to make a first turn 
    // --> A player who is ready to start the game first, can make the first turn 
    const [firstTurn, setFirstTurn] = useState(null);
    const [counterFirstTurn, setCounterFirstTurn ] = useState(0); 

    useEffect(() => {
      if(opponentStates.ready2Play && !gameStates.ready2Play && counterFirstTurn === 0){
        if(gameStates.isPlayer1){
          setFirstTurn(2);
        }else{
          setFirstTurn(1);
        }
        setCounterFirstTurn(counterFirstTurn+1)
  
      }else if(!opponentStates.ready2Play && gameStates.ready2Play && counterFirstTurn === 0){    
          if(gameStates.isPlayer1){
            setFirstTurn(1);
          }else{
            setFirstTurn(2);
          }
          setCounterFirstTurn(counterFirstTurn+1)
      }   

    },[opponentStates.ready2Play, gameStates.ready2Play, gameStates.isPlayer1, counterFirstTurn])

    // State to set the correct turn of a player 
    const [turnPlayer, setTurnPlayer] = useState(firstTurn); 

    /* ********************************************************************* */
    const fieldWidth = gameFieldSettings.fieldWidth;
    const fieldHeight = gameFieldSettings.fieldHeight;
    const backgroundColor = gameFieldSettings.backgroundColor;
    const coordsNonPlayableFields = gameFieldSettings.coordsNonPlayableFields; 
    const colorNonPlayableFields = gameFieldSettings.colorNonPlayableFields;
    const prefixSingleFieldID = gameFieldSettings.prefixID;
    const arrayLengthAxis = gameFieldSettings.arrayLengthAxis;
    const arrayLengthGameFields = gameFieldSettings.arrayLengthGameFields;
    /* ********************************************************************* */

    const sizeSingleField = Math.abs(fieldWidth)/arrayLengthAxis;
    const fieldStyle = {
      width: fieldWidth,
      height: fieldHeight,
      display: 'grid',

      // Separate the game field into single patterns 
      gridTemplateColumns: `repeat(${arrayLengthAxis}, ${sizeSingleField}px)`,
      gridTemplateRows: `repeat(${arrayLengthAxis}, ${sizeSingleField}px)`
    };
  
    // Create an array (Strings) for the x-Axis 
    const xAxisLetters = Array.from({ length: arrayLengthAxis }, (_, index) =>
      String.fromCharCode(65 + index)
    );

    // Create an array (Numbers) for the y-Axis 
    const yAxisNumbers = (Array.from({ length: arrayLengthAxis }, (_, index) => 
    (arrayLengthAxis - index)));
    
    // Merging the axis arrays into a new array of coordinates 
    let fieldCoordinates = helperFcn.getCoordinatesArray(xAxisLetters,yAxisNumbers, gameStates.isPlayer1);
    
    // Get color and number of current player
    let playerColor; 
    let playerNumber;

    if(gameStates.isPlayer1){
      playerColor = gameStates.colorPlayer1;
      playerNumber = 1;
    }
    else{
      playerColor = gameStates.colorPlayer2;
      playerNumber = 2;
    }
    
    /* ********************************************************************* */
    // Set properties of a single field and store them in an array
    
    let defaultFieldState = Array.from({ length: arrayLengthGameFields }).map((_, index) => {
      let singleFieldProps = helperFcn.setProps4SingleField(
                                          gameStates.isPlayer1,
                                          arrayLengthGameFields,
                                          prefixSingleFieldID,
                                          index,
                                          fieldCoordinates[index],
                                          sizeSingleField,
                                          backgroundColor);

      // Define non playable fields and modify the properties
      helperFcn.setNonPlayableFields(singleFieldProps,
                                    fieldCoordinates[index],
                                    coordsNonPlayableFields,
                                    colorNonPlayableFields);
      
        return singleFieldProps
    });

    //State as array to store and set game field properties 
    const [gameFieldState, setGameFieldState] = useState(defaultFieldState); 

    // State as array to store and set game figure properties
    const playerFigures = helperFcn.getFiguresOfPlayer(figProperties, playerColor);
    const [figureStorageState, setFigureStorageState] = useState([...playerFigures]); 

    // State as array to store defeated game figures
    const [defeatedFigureStorage, setDefeatedFigureStorage] = useState([]); 

    // State of added figures on field due to the opponent
    const [mergedSetUpFieldStates, setMergedSetUpFieldStates] = useState(null);

    // Send updates to channel
    useEffect(() => {
      const provideUpdatesToChannel = async (movedFigure) => 
      {
          gameLogic.addPathFigureBack(movedFigure);

          if(turnPlayer === playerNumber){
              // Change turn of current player
              setTurnPlayer(playerNumber === 1 ? 2:1)

              await channelStates.channelObj.sendEvent({
                  type: "moved-figure",
                  data: {movedFigure, turnPlayer},
              })
          }

          if(!turnPlayer || movedFigure.source.droppableId === "storageZone"){
            await channelStates.channelObj.sendEvent({
              type: "set-up-figures",
              data: {movedFigure},
          })            
          }
      }
      
      if(movedFigure.figureProps){
          provideUpdatesToChannel(movedFigure)

          console.log("@GameField - movedFigure: ", movedFigure)

          // Reset states of moved figure
          setMovedFigure((prevStates) => ({
            ...prevStates,
            figureProps: null,
            source: null,
            destination: null,
        }));
      } 

    }, [movedFigure, playerNumber, turnPlayer, channelStates.channelObj])

    // Handle channel events
    useEffect(() => {
      const handleChannelEvent = (event) => {

        if(event.type === "moved-figure" && event.user.id !== client.userID) {
          // Provide update of changed turn of current player after started game
          setTurnPlayer(event.data.movedFigure.player === 1 ? 2:1)
          console.log("@moved-figure - event.data:", event.data)

          // Update field states (in progress...)
          const updatedFieldStates = gameLogic.updateMovedFiguresOnGameField(event.data.movedFigure, gameFieldState);
        }
  
        if(event.type === "set-up-figures" && event.user.id !== client.userID) {
          // Get properties of added opponent figure
          const addedFigure = gameLogic.getAddedFigureOnField(event.data.movedFigure, gameFieldState);
          // Create an array with merged game field states
          const mergedFieldState = gameLogic.mergeGameFieldStates(gameFieldState, addedFigure);

          if(mergedFieldState){ 
            setMergedSetUpFieldStates(mergedFieldState) 
          }
        }
      };
  
      channelStates.channelObj.on(handleChannelEvent);
  
    }, [gameFieldState, client.userID, channelStates.channelObj, mergedSetUpFieldStates]); 
  
    // Rendering all igures of the game when both players are ready to play
    useEffect(() => {

      if(gameStates.ready2Play && opponentStates.ready2Play && buttonStates.counterUsedStartButton === 1){
        console.log("@GameField - current gameFieldState: ", gameFieldState);
        console.log("@GameField - mergedSetUpFieldStates: ", mergedSetUpFieldStates)
        
        // Update 'gameFieldState' to render hidden opponent and own game figures
        setGameFieldState(mergedSetUpFieldStates)
      }

    },[gameStates.ready2Play, 
       opponentStates.ready2Play, 
       buttonStates.counterUsedStartButton, 
       gameFieldState, mergedSetUpFieldStates])


    // Checking values of parameters in 'debugMode' 
    if(parameters.genCfg.debugMode){
      console.log("#############################################################");
      console.log("@GameField - gameFieldSettings: ", gameFieldSettings);
      console.log("@GameField - sizeSingleField [px]: ", sizeSingleField);
      console.log("@GameField - fieldCoordinates: ", fieldCoordinates);
      console.log("@GameField - playerColor: ", playerColor);
      console.log("@GameField - firstTurn: ", firstTurn);
      console.log("@GameField - playerFigures: ", playerFigures);
      console.log("@GameField - gameFieldState: ", gameFieldState);
      console.log("@GameField - figureStorageState: ", figureStorageState);
      console.log("@GameField - defeatedFigureStorage: ", defeatedFigureStorage);
      console.log("@GameField - gameStates: ", gameStates);
      console.log("#############################################################");
    }

    // Enable the button to start the game, when the figure storage list is empty
    useEffect(() => {
      const updateStartButton = () => {
        // Check if figure storage list is empty
        if (figureStorageState.length === 0 && buttonStates.counterUsedStartButton < 1) {
            setButtonStates((prevStates) => ({
              ...prevStates,
              disabledStartButton: false,
            }));
        }
      }; 

      updateStartButton()

    }, [figureStorageState, buttonStates.counterUsedStartButton, setButtonStates]);
    
    // Function to handle changes while dragging and ensure valid movement of the scout 
    const handleDragUpdate = ( update, fieldState ) => {

      const { source, destination } = update;
      // Indentify 'Scout' and get figure properties
      const figureProps = helperFcn.identifyScoutFigure(source, fieldState); 
      // Indentify a figure which has been dragged over and get properties
      const draggedOverFigure = helperFcn.getDraggedOverFigure(destination, fieldState);
      // Get position of destination field 
      const targetFieldPosition = helperFcn.getFieldPosition(destination, fieldState);
      
      // Update states in case of a found figure which was dragged over by the figure 'Scout'
      if(figureProps.isScoutFigure && draggedOverFigure.figure && gameStates.ready2Play){  
        setScoutStates((prevStates) => ({
          ...prevStates,
          isDraggedOverFigure: true,  
          sourcePosition: figureProps.sourcePosition,
          draggedOverFigurePosition: draggedOverFigure.position,       
        }))
      }

      // Check if the move made by the figure 'Scout' is valid and update state
      if(scoutStates.isDraggedOverFigure && targetFieldPosition){
        const isValidMove = helperFcn.checkValidScoutMove(scoutStates.sourcePosition, 
                                                          targetFieldPosition, 
                                                          scoutStates.draggedOverFigurePosition);

        setScoutStates((prevStates) => ({
          ...prevStates,
          isValidMove: isValidMove,
        }));   

        if(parameters.genCfg.debugMode){
          console.log("@handleDragUpdate - isValidMove_Scout: ", isValidMove)  
        }   
      }

      // Checking values of parameters in 'debugMode' 
      if(parameters.genCfg.debugMode){
          console.log("##########################################################");
          console.log("@handleDragUpdate - update: ", update);
          console.log("@handleDragUpdate - gameFieldState: ", fieldState);
          console.log("@handleDragUpdate - isScoutFigure: ", figureProps.isScoutFigure)
          console.log("@handleDragUpdate - draggedOverFigure: ", draggedOverFigure)
          console.log("##########################################################");
        }   
    }

    /* *************** Managing the behaviour of game related components *************** */ 
    return(
      <DragDropContext onDragUpdate = { (update) => {
                                    handleDragUpdate(update, gameFieldState)}}
                       onDragEnd = {(result) => {
                                  // Don't execute if specific scout move is not allowed and reset states
                                  if(!scoutStates.isValidMove){
                                    setScoutStates((prevStates) => ({
                                      ...prevStates,
                                      isDraggedOverFigure: false,  
                                      sourcePosition: null,
                                      draggedOverFigurePosition: null,       
                                      isValidMove: true,
                                    }))  
                                    return null                           
                                  }                      
                                  // Update game related states                     
                                  const updatedStates = gameLogic.handleDragDrop(result, gameFieldState, figureStorageState, prefixSingleFieldID, gameStates);

                                  if (updatedStates && !opponentStates.pausedGame){                                  
                                    // Get updated states from 'updatedStates'
                                    const { draggedFigure, gameFieldState: newGameFieldState, figureStorageState: newFigureStorageState} = updatedStates;
                                    
                                    if(draggedFigure){
                                      setMovedFigure((prevStates) => ({
                                        ...prevStates,
                                        player: playerNumber,
                                        figureProps: draggedFigure,
                                        source: result.source,
                                        destination: result.destination,
                                    }))

                                    }

                                    setGameFieldState(newGameFieldState);         // Update the State of the game field 
                                    setFigureStorageState(newFigureStorageState); // Update the State of the figure storage
                                  }
                                  else{ return null }
                                
                                }}>

         {/* *** Rendering Components *** */}                         
         <div className = "dnd-container" style={parameters.styleDnDContainer}>
          <div className = "game-field-container" style={parameters.styleGameFieldContainer}>
              {/* *** y-Axis *** */}
              <YAxis yAxisArray = {yAxisNumbers} 
                     axisHeight = {fieldHeight}
                     gameStates = {gameStates} 
                     axisStyle = {parameters.styleYAxis}/>
              {/* *** Game Field *** */}
              <div className="game-field" style={fieldStyle}>
                {/* Create and render single field elements with specific coordinates */ }
                {gameFieldState.map((fieldProps, index) => {   
                  return (

                    <Droppable droppableId={defaultFieldState[index].id} 
                    key={`${prefixSingleFieldID}_${index}`}
                    type = "FIGURE"
                    > 
                    {(provided) => (             
                      <div
                        style={fieldProps.style}
                        key={index}
                        className={"single-field"}
                        ref={provided.innerRef} 
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
              <XAxis xAxisArray = {xAxisLetters} 
                     singleFieldWidth = {sizeSingleField} 
                     gameStates = {gameStates} 
                     axisStyle={parameters.styleXAxis}/>
          </div>
            <FigureStorage figStateArray = {figureStorageState} />    
            <DefeatedFigureStorage defFigStateArray = {defeatedFigureStorage}
                                   setDefState = {setDefeatedFigureStorage}
                                   figStorageState = {figureStorageState} />

            <ToastContainer position='top-right' />                           
        </div> 
      </DragDropContext>
    )     
};

export default GameField;
