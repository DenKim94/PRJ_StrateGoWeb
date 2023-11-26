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
export function getCoordinatesArray(xCoordArray,yCoordArray, isPlayer1){

    let coordinatesArray = yCoordArray.flatMap((yVal) => 
        xCoordArray.map((xVal) => [xVal, Number(yVal)])
    );
    if(!isPlayer1){
        coordinatesArray = coordinatesArray.reverse(); 
    }
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
export function getFiguresOfPlayer(figList, colorPlayer){
    
    // Filter the list to get figures with corrresponding color and without 'FigureBack.png'
    const playerFigures = figList.filter((figProps) => {
        return figProps.color === colorPlayer && figProps.figName !== 'FigureBack.png'
    }); 
    return playerFigures || null
}

/**** Helper function to return the color of current player ****/
export function getColorOfPlayer(gameStates){
    // Returned variable as string
    let colorPlayer  
    // Chosen color of player 1
    if (gameStates.isPlayer1){ 
        colorPlayer = gameStates.colorPlayer;
    }
    else {
        // Color of player 2 depends on the chosen color by player 1
        switch (gameStates.colorPlayer){
            case 'red':
                colorPlayer = 'blue';
                break;

            case 'blue':
                colorPlayer = 'red';
                break;
            
            default:
                colorPlayer = null;    
        }
    }
    return colorPlayer 
}