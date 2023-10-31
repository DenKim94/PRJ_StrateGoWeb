// import * as helperFcn from '../components/functions/helperFunctions.js'

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
    // Identify a (not) playable game field [bool]
    const isPlayable = GameFieldState[indexTargetField].isPlayable; 
    const newFigureStorageState = figureStorageState; 
    console.log("**** Debugging moveFigureOnField ****")
    console.log(">> FieldState:", GameFieldState)
    console.log(">> draggableId:", draggableId)

    // Identify properties of a dragged figure and corresponding field
    const fieldProps = GameFieldState.find((obj) => {
        return obj.figure && `${gameSettings.colorPlayer}_${obj.figure.id}` === draggableId;
    });
    const draggedFigure = fieldProps.figure;

    /* TO-DO: Limiting the movements of figures depending on their properties (31.10.2023) 
            1) Only one field per turn is allowed except of a 'Scout' (current position as reference) 
            2) Moving directions: Only vertical or horizontal  */

    // Update the State of the source game field 
    GameFieldState = updateGameFieldStateProps(GameFieldState, indexSourceField, [true, null])       
    // Update the State of the target game field 
    GameFieldState = updateGameFieldStateProps(GameFieldState, indexTargetField, [false, draggedFigure])

    // Handle the action in case of an occupied field
    if(!isPlayable){
        const winner = handleOccupiedField(GameFieldState, indexTargetField, draggedFigure)
        // If 'winner' is existing and is not a string, update the state of the game field 
        if(winner && typeof winner !== "string"){
            // Update the State of the target game field 
            GameFieldState = updateGameFieldStateProps(GameFieldState, indexTargetField, [false, winner])
        }
        // If no 'winner' exists, both figures are going to be removed from game field
        else if(typeof winner === "string"){
            // Update the State of the target game field 
            GameFieldState = updateGameFieldStateProps(GameFieldState, indexTargetField, [true, null]) 

            /* TO-DO: Handle removed/dead figures (31.10.2023) 
            1) Put the (dead) figures in a list/state of the component 'FigureStorage'
            2) Render the updated component which includes the removed/dead figures */
        }
        else { return }
    }

    const newGameFieldState = GameFieldState;

    console.log(">> fieldProps:", fieldProps)            
    console.log(">> draggedFigure:", draggedFigure)
    console.log(">> newGameFieldState:", newGameFieldState)
    console.log("*************************************")

    // Return States
    return [newGameFieldState, newFigureStorageState]   
}

/**** Helper function to handle the interaction in case of an occupied game field ****/
function handleOccupiedField(newGameFieldState, indexTargetField, draggedFigure){ 
    // Get properties of placed figure [object]
    const placedFigure = newGameFieldState[indexTargetField].figure;
    console.log(">> placedFigure: ", placedFigure)

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

    // console.log("results: ",results)
    // console.log("gameFieldState: ", gameFieldState)
    // console.log("figureStorageState: ", figureStorageState)
    
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
    const sourceFieldProps = getPropsOfGameField(gameFieldState, indexSourceField); 
    const targetFieldProps = getPropsOfGameField(gameFieldState, indexTargetField); 

    // If target field does not exist, do nothing
    if(!targetFieldProps){
        return
    }
    console.log("indexSourceField: ", indexSourceField)
    console.log("sourceFieldProps: ", sourceFieldProps)
    console.log("targetFieldProps: ", targetFieldProps)

    /****** Moving of game figures for different use-cases ******/
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

            // Return if target field is not playable
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

            console.log(">> newGameFieldState:", newGameFieldState)
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