/**** Helper function to create a single field with defined properties ****/
/*  
Input: fieldCoordinates [column, row],
       sizeSingleField [fieldWidth = fieldHeight],
       backgroundColor [background color of a single field]
Output: 
    singleFieldProps = {
        ID: ID-Number
        pos_x: xCoord [column],
        pos_y: yCoord [row],
        style: {
            width: sizeSingleField,
            height: sizeSingleField,
            backgroundColor: backgroundColor, 
            border: '1px solid black'         
        }
    }; 
*/
export const setProps4SingleField = (prefixSingleFieldID,index,fieldCoordinates,sizeSingleField,backgroundColor) => {
    let singleFieldProps = {
        id: `${prefixSingleFieldID}_${index}`,
        pos_x: fieldCoordinates[0],
        pos_y: fieldCoordinates[1],
        isPlayable: true,
        figure: null,
        style: {
            width: sizeSingleField,
            height: sizeSingleField,
            backgroundColor: backgroundColor, // set background color of a single field
            border: '1px solid black'         // set black border of the field 
        }       
    };
    return singleFieldProps
};

/**** Helper function to get coordinates for each field ****/
/*
Input: xCoordArray [columns], yCoordArray [rows] 
Output: coordinatesArray [column, row] 
*/
export function getCoordinatesArray(xCoordArray,yCoordArray){
    const coordinatesArray = yCoordArray.flatMap((yVal) => 
        xCoordArray.map((xVal) => [xVal, Number(yVal)])
    );
    return coordinatesArray
};

/**** Helper function to set properties of non playable fields ****/
export function setNonPlayableFields(singleFieldProps,
                                     currentCoordinates,
                                     coordsNonPlayableFields,
                                     color){
    /**** Check for coordinates of non playable fields 
          and modify the properties if neccessary ****/ 
    const containsCoordinates = coordsNonPlayableFields.some(coords =>
        arraysAreEqual(coords, currentCoordinates)
    );
    if (containsCoordinates){
        singleFieldProps.isPlayable = false;
        singleFieldProps.style.border = '0';
        singleFieldProps.style.backgroundColor = color;
      }
    return singleFieldProps  
}
/**** Helper function to check if the coordinates are equal ****/
function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

/**** Helper function to get stored keys of an Object-Array ****/
export function getObjArrayKeys(objArray){
    const keysArray = [];
    objArray.forEach(obj => {
        const keys = Object.keys(obj);
        keysArray.push(keys)
      });
    return keysArray    
}

/**** Helper function to sort and return game figures of each player ****/
export function getFigures4Player(figList, colorPlayer){
    
    // Filter the list to get figures with corrresponding color and without 'FigureBack.png'
    const playerFigures = figList.filter((figProps) => {
        return figProps.color === colorPlayer && figProps.figName !== 'FigureBack.png'
    }); 
    return playerFigures || null
}

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
    const newFigureStorageState = figureStorageState; 
    console.log("**** Debugging moveFigureOnField ****")
    console.log(">> FieldState:", GameFieldState)
    console.log(">> draggableId:", draggableId)

    // Identify properties of a dragged figure and corresponding field
    const fieldProps = GameFieldState.find((obj) => {
        return obj.figure && `${gameSettings.colorPlayer}_${obj.figure.id}` === draggableId;
    });
    const draggedFigure = fieldProps.figure;

    // Update the State of the source game field 
    GameFieldState[indexSourceField] = {
        ...GameFieldState[indexSourceField],
        isPlayable: true,
        figure: null,
    };        
    // Update the State of the target game field 
    GameFieldState[indexTargetField] = {
        ...GameFieldState[indexTargetField],
        isPlayable: false,
        figure: draggedFigure,
    };

    const newGameFieldState = GameFieldState;

    // handleOccupiedField(newGameFieldState, indexTargetField)

    console.log(">> newGameFieldState:", newGameFieldState)
    console.log(">> fieldProps:", fieldProps)            
    console.log(">> draggedFigure:", draggedFigure)
    console.log("*************************************")

    return [newGameFieldState, newFigureStorageState]   
}

/**** Helper function to handle the interaction in case of an occupied game field ****/
function handleOccupiedField(newGameFieldState, indexTargetField){
    // Get properties of placed figure [object]
    const placedFigure = newGameFieldState[indexTargetField].figure;
    console.log(">> placedFigure: ", placedFigure)
  
}

/**** Helper function to handle the drag and drop action ****/
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
    let isOccupiedField = false;                    // Flag for already occupied (or not playable) game field     
    let newFigureList = [...figureStorageState];   // Updated state of the list, which contains the game figures in starting position
    let newGameFieldState = [...gameFieldState];   // Updated state of the game-field-array
    let newFigureStorageState = null;              // Placeholder for an filtered array with removed game figures

    // Identify the index [number] of source and target game field
    const indexSourceField = getIndexOfGameField(gameFieldState, source); 
    const indexTargetField = getIndexOfGameField(gameFieldState, destination); 

    // Get properties of the target field object
    const sourceFieldProps = getPropsOfGameField(gameFieldState, indexSourceField); 
    const targetFieldProps = getPropsOfGameField(gameFieldState, indexTargetField); 

    // If no target field is existing, do nothing
    if(!targetFieldProps){
        return
    }
    console.log("indexSourceField: ", indexSourceField)
    console.log("sourceFieldProps: ", sourceFieldProps)
    console.log("targetFieldProps: ", targetFieldProps)

    /****** TO-DO: Implement moving game figures for different Use-Cases ******/
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
        // Identify a (not) playable game field [bool]
        const isPlayable = newGameFieldState[indexTargetField].isPlayable;  
        // Early return if the destination field is not playable
        if (!isPlayable) return;   
                      
        // Placing figures from storage zone on the game field (starting positions)
        if(newFigureList.length > 0 && source.droppableId === "storageZone"){
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

            //console.log(">> draggedFigure:", draggedFigure)
            //console.log(">> newFigureStorageState:", newFigureStorageState)
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