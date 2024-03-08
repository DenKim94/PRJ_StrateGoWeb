// import * as helperFcn from '../components/functions/helperFunctions.js'
import { genCfg } from './parameters';
import { gameFieldObj } from './parameters';
import { figProperties } from './parameters';

/**
 * Helper function to get an index of a game field with specific ID
*/
function getIndexOfGameField(stateArray, fieldObj){
    const indexField = stateArray.findIndex((fieldProps) => fieldProps.id === fieldObj.droppableId);
    
    if(indexField > 0){ 
        return indexField ;
    }else{
        return null;    // If index not found return null
    }
}

/**
 * Helper function to get properties of a single field element
*/
function getPropsOfGameField(stateArray, index){
    const fieldProps = stateArray[index];
    return fieldProps || null
}

/**
 * Helper function to move game figures on the game field 
*/
function moveFigureOnField(GameFieldState, gameSettings, draggableId, figureStorageState, 
                           indexSourceField, indexTargetField)
{
    // Get field properties of target field
    const targetFieldProps = getPropsOfGameField(GameFieldState, indexTargetField)
    // Initialize a state of figure storage component
    const newFigureStorageState = figureStorageState ; 
    // Get a property parameter of a target field
    const isPlayableField = targetFieldProps.isPlayable; 

    // Identify properties of a dragged figure and corresponding field
    const sourceFieldProps = GameFieldState.find((obj) => {
        return obj.figure && `${obj.figure.color}_${obj.figure.id}` === draggableId;
    });
    const draggedFigure = sourceFieldProps.figure;

    // Maintain a correct moving of a dragged game figure after starting the game
    if(gameSettings.ready2Play){
        // Run the check 
        let isAllowedMovement = checkCorrectMoving(sourceFieldProps, targetFieldProps, draggedFigure)
        if(!isAllowedMovement){
            // If incorrect movement, return without updating the states
            return [GameFieldState, newFigureStorageState] 
        }
    }
    
    // Update the State of the source game field 
    let newGameFieldState = updateGameFieldStateProps(GameFieldState, indexSourceField, [true, null])       

    // Handle the action in case of an occupied field
    if(!isPlayableField){
        const winner = handleOccupiedField(targetFieldProps, draggedFigure)

        // If the type of returned 'winner' is an object (not as 'null')
        if(winner && typeof winner !== "string"){
            // Update the State of the target game field 
            newGameFieldState = updateGameFieldStateProps(newGameFieldState, indexTargetField, [false, winner])
        }
        /* If the type of returned 'winner' is a string, both figures are going to be removed from game field 
           and will be added to the figure storage list as 'dead' figure */
        else if(typeof winner === "string"){
            // Update the State of the target game field 
            newGameFieldState = updateGameFieldStateProps(newGameFieldState, indexTargetField, [true, null]) 

            /* TO-DO: Handle removed/dead figures (31.10.2023) 
            1) Put the (dead) figures in an empty list/state of the component 'FigureStorage'
            2) Render the updated component which includes the removed/dead figures */
        }
        // If returned value of 'winner' is 'null'
        else {
            // Reset the source game field to previous state  
            newGameFieldState = updateGameFieldStateProps(newGameFieldState, indexSourceField, [false, draggedFigure]) 
        }
    }
    else {      
        // Update the State of the target game field 
        newGameFieldState = updateGameFieldStateProps(newGameFieldState, indexTargetField, [false, draggedFigure])
    }
    // Show values of parameters in a console when 'debugMode' is active
    if(genCfg.debugMode){
        console.log("##############################################")
        console.log("@moveFigureOnField - GameFieldState:", GameFieldState)
        console.log("@moveFigureOnField - draggableId:", draggableId)
        console.log("@moveFigureOnField - sourceFieldProps:", sourceFieldProps)  
        console.log("@moveFigureOnField - targetFieldProps:", targetFieldProps)           
        console.log("@moveFigureOnField - draggedFigure:", draggedFigure)
        console.log("@moveFigureOnField - newGameFieldState:", newGameFieldState)
        console.log("##############################################")
    }
    // Return States
    return [newGameFieldState, newFigureStorageState]   
}

/**
 * Helper function to ensure a correct movement of the game figure 
*/
function checkCorrectMoving(sourceFieldProps, targetFieldProps, figureProps){
    // Start position of dragged figure: [x,y]
    const startPos = [sourceFieldProps.pos_x, sourceFieldProps.pos_y];  
    // End position of dragged figure: [x,y]
    const endPos = [targetFieldProps.pos_x, targetFieldProps.pos_y];    

    // Check direction: It is only allowed to move a game figure vertically or horizontally
    if(!checkMovingDirection(startPos, endPos)){
        return false;
    }
    // Get name of dragged/moving figure
    const figName = figureProps.figName; 
    // It is not allowed to move 'Flag' or 'Bomb' anymore after starting the game
    if(figName.includes("Flag") || figName.includes("Bomb")){
        return false;
    }
    // Get Array with steps in x- and y- direction
    const movedSteps = getMovingSteps(startPos, endPos);
    // If more than one step was made by a figure which is not named as 'Scout'
    if(!figName.includes("Scout") && movedSteps.some(step => step > 1)){
        // Movement is not allowed 
        return false;
    }
    // Movement is allowed 
    else{ return true; }   
}

/**
 * Helper function to check a valid/allowed direction of a movement
*/
function checkMovingDirection(startPos, endPos){
    // Initialized parameter, which will be returned as boolean [true or false]
    let isAllowed = true;  
    // Absolute difference between the y-coordinates
    const absDiff_y = Math.abs(endPos[1] - startPos[1]); 
    // Moving in x-direction (allowed)
    if((startPos[0] !== endPos[0]) && absDiff_y === 0){
        isAllowed = true;
    }
    // Moving in y-direction (allowed)
    else if(absDiff_y >= 1 && (startPos[0] === endPos[0])){
        isAllowed = true;
    }
    // Diagonal movement is not allowed
    else{
        isAllowed = false;
    }
    // Show values of parameters in a console when 'debugMode' is active
    if(genCfg.debugMode){
        console.log("##############################################")
        console.log("@checkMovingDirection - startPos: ", startPos)
        console.log("@checkMovingDirection - endPos: ", endPos)
        console.log("@checkMovingDirection - absDiff_y: ", absDiff_y)
        console.log("@checkMovingDirection - isAllowedDirection: ", isAllowed)
        console.log("##############################################")
    }   
    return isAllowed
}

/**
 * Helper function to get a number of moving steps of a dragged figure 
*/
function getMovingSteps(startPos, endPos){
    // Array to translate a letter to corresponding number as defined in 'parameters/gameFieldObj'
    const let2num = gameFieldObj.Letters2Numbers;
    // Absolute difference between the x-coordinates
    const x_steps = Math.abs(let2num[endPos[0]] - let2num[startPos[0]]);
    // Absolute difference between the y-coordinates
    const y_steps = Math.abs(endPos[1] - startPos[1]); 
    // Array with steps in x- and y- direction 
    const steps = [x_steps, y_steps]; 
    // Show values of parameters in a console when 'debugMode' is active
    if(genCfg.debugMode){
        console.log("##############################################")
        console.log("@getMovingSteps - let2num: ", let2num)
        console.log("@getMovingSteps - [x_steps, y_steps]: ", steps)
        console.log("##############################################")
    }   
    return steps
}    

/**
 * Helper function to handle the interaction in case of an occupied game field 
*/
function handleOccupiedField(targetFieldProps, draggedFigure){ 
    // Get properties of placed figure [object]
    const placedFigure = targetFieldProps.figure;
    // Show values of parameters in a console when 'debugMode' is active
    if(genCfg.debugMode){
        console.log("##############################################")
        console.log("@handleOccupiedField - placedFigure: ", placedFigure)
        console.log("##############################################")
    }

    // If 'placedFigure' does not exist, return null
    if(!placedFigure){
        return null;
    }
    // If the destination field is occupied by an opponent --> battle
    if (placedFigure.color !== draggedFigure.color){
        const winner = battleFigures(draggedFigure, placedFigure);
        return winner 
    }
    // If the target field is occupied by own figure or is just not playable, return null
    else{ 
        return null; 
    }   
}
/**
 * Helper function to handle the battle between two game figures
*/
function battleFigures(figObj_1, figObj_2){
    let winner = "drawn"; 
    if(figObj_1.value > figObj_2.value){
        return winner = figObj_1;
    }else if(figObj_1.value < figObj_2.value){
        return winner = figObj_2;
    }else{
        /* If the compared values are equal, 
        'winner' will be returned as a string named 'drawn' */
        return winner;
    }
}

/**
 * Helper function to update the properties of a specific field in the game field.
 *
 * @function
 * @param {Array<Object>} FieldState - The array representing the current state of the game field.
 * @param {number} indexField - The index of the field in the array to be updated.
 * @param {Array} props - An array containing the properties to be updated [isPlayable, figureObj].
 * @param {boolean} props [0]: The updated value for the 'isPlayable' property.
 * @param {Object} props [1]: The updated value for the 'figure' property.
 * @returns {Array<Object>} The updated game field state with modified properties.
 * @throws {Error} Throws an error if the provided index is out of bounds.
 *
 * @example
 * const updatedFieldState = updateGameFieldStateProps(gameFieldState, 2, [true, { id: 1, imgPath: '', ... }]);
 */
function updateGameFieldStateProps(FieldState, indexField, props){
    FieldState[indexField] = {
        ...FieldState[indexField],
        isPlayable: props[0],
        figure: props[1],
    };
    return FieldState;
}

/**
 * Function to handle the drag and drop process and ensure correct game logic.
 *
 * @param {Object} results - The results object containing information about the drag and drop action.
 * @param {Array<Object>} gameFieldState - The current state of the game field.
 * @param {Array<Object>} figureStorageState - The current state of the figure storage.
 * @param {string} prefixSingleFieldID - The prefix used to identify a single field in the game.
 * @param {Object} gameSettings - The current game settings.
 * @param {boolean} gameSettings.isPaused - Indicates if the game is paused.
 * @param {boolean} gameSettings.leaveGame - Indicates if a player has left the game.
 * @returns {?Object} An object containing the updated game field and figure storage states, or null if no update is needed.
 *
 * @example
 * const results = { source: {...}, destination: {...}, type: "FIGURE", draggableId: "white_knight" };
 * const updatedStates = handleDragDrop(results, gameFieldState, figureStorageState, "field_", gameSettings);
 */
export function handleDragDrop(results, gameFieldState, figureStorageState, prefixSingleFieldID, gameSettings) 
{   
    // Extract the properties after the DnD action
    const { source, destination, type, draggableId } = results;

    if(genCfg.debugMode){
        console.log("##############################################")
        console.log("@handleDragDrop - results: ",results)
        console.log("@handleDragDrop - gameFieldState: ",gameFieldState)
        console.log("##############################################")
    }

    // If the game is paused, do nothing
    if(gameSettings.isPaused || gameSettings.leaveGame){
        return null;
    }
    // If destination doesn't exist, do nothing 
    if(!destination){
        alert("Invalid drop: Please drop the figure inside the game field!")
        return null;        
    } 
    // If source and destination are equal, do nothing 
    if(source.droppableId === destination.droppableId && source.index === destination.index) 
        return null; 

    /**********************************************/
    // Setting default values
    let draggedFigure = null;                      // Placeholder for object properties of a dragged game figure   
    let newFigureList = [...figureStorageState];   // Updated state of the list, which contains the game figures in starting position
    let newGameFieldState = [...gameFieldState];   // Updated state of the game-field-array
    let newFigureStorageState = null;              // Placeholder for an filtered array with removed game figures

    // Identify the index [number] of source and target game field
    const indexSourceField = getIndexOfGameField(gameFieldState, source); 
    const indexTargetField = getIndexOfGameField(gameFieldState, destination); 

    // Get properties of the target field object
    const targetFieldProps = getPropsOfGameField(gameFieldState, indexTargetField); 

    /****** Logic for moving game figures in different use-cases ******/
    // If properties of 'targetFieldProps' Object don't exist, do nothing
    if(!targetFieldProps){
        return null;
    }
    // It's only allowed to place game figures on the own half (before starting the game) 
    if (!gameSettings.ready2Play){
        switch(gameSettings.isPlayer1){
            case true:
                // Limitation of moving area from perspective of player 1
                if (targetFieldProps.pos_y > 4){
                    return null;
                } 
                break;
            case false:
                // Limitation of moving area from perspective of player 2
                if (targetFieldProps.pos_y < 7){
                    return null;
                } 
                break;
            default:    
        }
    } 
    /* *** Updating the States of figures and game field after dragging *** */
    if(type === "FIGURE" && source.droppableId !== destination.droppableId){
                        
        // Placing figures from storage zone on the game field (starting positions)
        if(newFigureList.length > 0 && source.droppableId === "storageZone"){

            // Return if target field is not playable or occupied by own figure
            if(!newGameFieldState[indexTargetField].isPlayable){ return null; } 
            // Identify dragged figure
            draggedFigure = newFigureList.find((figProps) => `${figProps.color}_${figProps.id}` === draggableId);
            // Remove dropped figure from the origin figure list (if not empty)
            newFigureStorageState = figureStorageState.filter((props) => props.id !== draggedFigure.id);
            // Update the State of the game field 
            newGameFieldState[indexTargetField] = {
                ...newGameFieldState[indexTargetField],
                isPlayable: false,
                figure: draggedFigure,
            };
            // Show values of parameters in a console when 'debugMode' is active
            if(genCfg.debugMode){
                console.log("##############################################")
                console.log("@handleDragDrop - figureStorageState: ", figureStorageState)
                console.log("@handleDragDrop - newFigureStorageState: ", newFigureStorageState)
                console.log("@handleDragDrop - gameFieldState: ", gameFieldState)
                console.log("@handleDragDrop - targetFieldProps: ", targetFieldProps)
                console.log("@handleDragDrop - newGameFieldState:", newGameFieldState)
                console.log("##############################################")
            }
        }
        // Moving figures inside the game field
        else if(destination.droppableId.includes(prefixSingleFieldID) && source.droppableId !== "storageZone"){
            [newGameFieldState, newFigureStorageState] = moveFigureOnField(newGameFieldState, gameSettings, 
                                                                           draggableId, figureStorageState, 
                                                                           indexSourceField, indexTargetField)
        }  
    }
    // Return updates states
    return {
        draggedFigure: draggedFigure,
        gameFieldState: newGameFieldState,
        figureStorageState: newFigureStorageState,
      };       
}

// Function to update the game field due to moved figures
export function updateMovedFiguresOnGameField(movedFigObj, currentGameFieldState){

    // In progress ...
    let updatedGameFieldStates = currentGameFieldState;

    const indexSourceField = getIndexOfGameField(currentGameFieldState, movedFigObj.source);
    const indexTargetField = getIndexOfGameField(currentGameFieldState, movedFigObj.destination); 

    console.log("@updateMovedFiguresOnGameField - currentGameFieldState: ", currentGameFieldState)  
    console.log("@updateMovedFiguresOnGameField - [indexSourceField, indexTargetField]: ", [indexSourceField, indexTargetField])

}

// Function to get properties of added opponent figures
export function getAddedFigureOnField(movedFigObj, currentGameFieldState){
    
    let addedFigure = {
        figureProps: null,
        indexDestField: null,
        destFieldID: null,
    };

    const indexTargetField = getIndexOfGameField(currentGameFieldState, movedFigObj.destination); 
    const targetFieldID    = currentGameFieldState[indexTargetField].id;

    if(indexTargetField){
        addedFigure = {
            figureProps: movedFigObj.figureProps,
            indexDestField: indexTargetField,
            destFieldID: targetFieldID,
        };
    }

    return addedFigure
}

// Function to add an additional path for the back side of a gamefigure
export function addPathFigureBack(movedFigObj){

        // Get a path of an corresponding image to hide the figure of the opponent
        const indexFigureBack = figProperties.findIndex((figProps) => figProps.figName === "FigureBack.png" && figProps.color === movedFigObj.figureProps.color);
    
        const imgFigureBackPath = figProperties[indexFigureBack].imgPath[0];
    
        let currentFigurePaths = movedFigObj.figureProps.imgPath;
        currentFigurePaths.push(imgFigureBackPath)
        
        const movedFigureProps = {
            ...movedFigObj.figureProps,
            imgPath: currentFigurePaths,
        };
   
        return movedFigureProps
}

// Function to add hided figures of the opponent to the game field state
export function mergeGameFieldStates(currentFieldStates, addedFigure){

    // Copy state array to avoid changes on the input array
    let copiedGameFieldState = [...currentFieldStates];
    // Find the specific field ID to add a figure to a corresponding field
    const foundIndex = copiedGameFieldState.findIndex((fieldProps) => fieldProps.id === addedFigure.destFieldID);

    // Add figure properties to the state array
    if(foundIndex !== -1){
        copiedGameFieldState[foundIndex] = {
            ...copiedGameFieldState[foundIndex],
            figure: addedFigure.figureProps,
        };
    }
    else{ return null }

    return copiedGameFieldState
}