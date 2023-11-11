// import * as helperFcn from '../components/functions/helperFunctions.js'
import { genCfg } from './parameters';
import { gameFieldObj } from './parameters';

/**** Helper function to get the index of the game-field-array ****/
function getIndexOfGameField(stateArray, fieldObj){
    const indexField = stateArray.findIndex((fieldProps) => fieldProps.id === fieldObj.droppableId);
    return indexField || null;
}

/**** Helper function to get the properties of a single field element ****/
function getPropsOfGameField(stateArray, index){
    const fieldProps = stateArray[index];
    return fieldProps || null
}

/**** Helper function to move game figures inside the game field ****/
function moveFigureOnField(GameFieldState, gameSettings, draggableId, figureStorageState, 
                           indexSourceField, indexTargetField)
{
    // Get field properties of target field
    const targetFieldProps = getPropsOfGameField(GameFieldState, indexTargetField)
    // Initialize a state of figure storage component
    const newFigureStorageState = figureStorageState ; 
    // Get a property parameter of a target field
    const isPlayable = targetFieldProps.isPlayable; 

    // Identify properties of a dragged figure and corresponding field
    const sourceFieldProps = GameFieldState.find((obj) => {
        return obj.figure && `${gameSettings.colorPlayer}_${obj.figure.id}` === draggableId;
    });
    const draggedFigure = sourceFieldProps.figure;

    /* TO-DO: Limiting the movements of figures depending on their properties after starting the game (31.10.2023) 
            1) Only one field per turn is allowed except of a 'Scout' (current position as reference) 
            2) Moving directions: Only vertical or horizontal  */

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
    if(!isPlayable){
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
        console.log("**** function moveFigureOnField ****")
        console.log(">> GameFieldState:", GameFieldState)
        console.log(">> draggableId:", draggableId)
        console.log(">> sourceFieldProps:", sourceFieldProps)  
        console.log(">> targetFieldProps:", targetFieldProps)           
        console.log(">> draggedFigure:", draggedFigure)
        console.log(">> newGameFieldState:", newGameFieldState)
        console.log("*************************************")
    }
    // Return States
    return [newGameFieldState, newFigureStorageState]   
}

/**** Helper function to maintain a correct moving of a game figure ****/
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

/**** Helper function to check if the direction of a movement is allowed ****/
function checkMovingDirection(startPos, endPos){
    // Initialized parameter, which will be returned as boolean [true or false]
    let isAllowed   
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
        console.log("**** function checkMovingDirection ****")
        console.log(">> startPos: ", startPos)
        console.log(">> endPos: ", endPos)
        console.log(">> absDiff_y: ", absDiff_y)
        console.log(">> isAllowedDirection: ", isAllowed)
    }   
    return isAllowed
}

/**** Helper function to maintain a correct number of movement steps of dragged figure ****/
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
        console.log("**** function getMovingSteps ****")
        console.log(">> let2num: ", let2num)
        console.log(">> [x_steps, y_steps]: ", steps)
    }   
    return steps
}    

/**** Helper function to handle the interaction in case of an occupied game field ****/
function handleOccupiedField(targetFieldProps, draggedFigure){ 
    // Get properties of placed figure [object]
    const placedFigure = targetFieldProps.figure;
    // Show values of parameters in a console when 'debugMode' is active
    if(genCfg.debugMode){
        console.log("**** function handleOccupiedField ****")
        console.log(">> placedFigure: ", placedFigure)
    }
    // Return if the destination field is occupied by own figure
    if (placedFigure.color === draggedFigure.color){ 
        return null; 
    }
    // If the destination field is occupied by an opponent --> battle
    else if(placedFigure.color !== draggedFigure.color){
        const winner = battleFigures(draggedFigure, placedFigure);
        return winner
    }
    // If the target field is just not playable, return the function
    else{ 
        return null; 
    }   
}
/**** Helper function to handle the battle between figures ****/
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

/**** Helper function to update the properties of the game field ****/
/*  
Input: FieldState [Array including objects],
       indexField [Number],
       props [isPlayable, figureObj] 
Output: 
       FieldState with updated properties 
*/
function updateGameFieldStateProps(FieldState, indexField, props){
    FieldState[indexField] = {
        ...FieldState[indexField],
        isPlayable: props[0],
        figure: props[1],
    };
    return FieldState;
}

/**** Function to handle the drag and drop action ****/
export function handleDragDrop(results, gameFieldState, figureStorageState, prefixSingleFieldID, gameSettings) 
{   
    /* Extract the properties after the DnD action */
    const { source, destination, type, draggableId } = results;
    
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

    // If target field does not exist, do nothing
    if(!targetFieldProps){
        return
    }

    /****** Logic for moving game figures in different use-cases ******/
    /* If destination doesn't exist, do nothing */
    if(!destination) 
        return;
    /* If source and destination are equal, do nothing */
    if(source.droppableId === destination.droppableId && source.index === destination.index) 
        return;  
    /* It's only allowed to place game figures on the own half (before starting the game) */
    if (targetFieldProps.pos_y > 4 && !gameSettings.ready2Play)
        return;

    /* *** Updating the States of figures and game field after dragging *** */
    if(type === "FIGURE" && source.droppableId !== destination.droppableId){
                        
        // Placing figures from storage zone on the game field (starting positions)
        if(newFigureList.length > 0 && source.droppableId === "storageZone"){

            // Return if target field is not playable or occupied by own figure
            if(!newGameFieldState[indexTargetField].isPlayable){ return; } 
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
                console.log("**** function handleDragDrop ****")
                console.log(">> results: ",results)
                console.log(">> figureStorageState: ", figureStorageState)
                console.log(">> newFigureStorageState: ", newFigureStorageState)
                console.log(">> gameFieldState: ", gameFieldState)
                console.log(">> newGameFieldState:", newGameFieldState)
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
        gameFieldState: newGameFieldState,
        figureStorageState: newFigureStorageState,
      };
        
}