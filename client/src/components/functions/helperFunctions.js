/**
 * Helper function to create properties for a single game field.
 * 
 * @function
 * @param {string} prefixSingleFieldID - Prefix for the unique identifier of the single field.
 * @param {number} index - Index of the single field.
 * @param {Array} fieldCoordinates - Coordinates of the single field [column, row].
 * @param {number} sizeSingleField - Size of the single field (width and height).
 * @param {string} backgroundColor - Background color of the single field.
 * @returns {Object} singleFieldProps: Properties for a single game field.
 * @property {string} singleFieldProps.id - Unique identifier for the single field.
 * @property {number} singleFieldProps.pos_x - X-coordinate of the single field (column).
 * @property {number} singleFieldProps.pos_y - Y-coordinate of the single field (row).
 * @property {boolean} singleFieldProps.isPlayable - Indicates whether the field is playable.
 */
export const setProps4SingleField = (prefixSingleFieldID,index,fieldCoordinates,sizeSingleField,backgroundColor) => {
    const singleFieldProps = {
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

/**
 * Helper function to get coordinates for each field based on column and row arrays.
 * 
 * @function
 * @param {Array} xCoordArray - Array representing columns.
 * @param {Array} yCoordArray - Array representing rows.
 * @param {boolean} isPlayer1 - Indicates whether the coordinates are for Player 1.
 * @returns {Array} coordinatesArray: Array of coordinates [column, row].
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

/**
 * Helper function to set properties of non-playable fields based on specified coordinates.
 * 
 * @function
 * @param {Object} singleFieldProps - Properties of a single game field.
 * @param {Array} currentCoordinates - Coordinates of the current field [column, row].
 * @param {Array} coordsNonPlayableFields - Array of coordinates for non-playable fields.
 * @param {string} color - Color to be set for non-playable fields.
 * @returns {Object} singleFieldProps: Modified properties of the single game field.
 * @property {boolean} singleFieldProps.isPlayable - Indicates whether the field is playable.
 * @property {string} singleFieldProps.style.border - Border style of the single field.
 * @property {string} singleFieldProps.style.backgroundColor - Background color of the single field.
 */
export function setNonPlayableFields(singleFieldProps,
                                     currentCoordinates,
                                     coordsNonPlayableFields,
                                     color){
    /* Check for coordinates of non playable fields 
          and modify the properties if neccessary */ 
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
/**
 *  Helper function to check if the coordinates are equal
*/
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

/** 
 * Helper function to get stored keys of a map
*/
export function getObjArrayKeys(objArray){
    let keysArray = [];
    objArray.forEach(obj => {
        const keys = Object.keys(obj);
        keysArray.push(keys)
      });
    return keysArray    
}

/**
 * Helper function to sort and return game figures of a specific player based on color.
 * 
 * @function
 * @param {Array} figList - List of game figure properties.
 * @param {string} colorPlayer - Color of the player for whom to retrieve the figures.
 * @returns {Array|null} playerFigures: Array of game figures for the specified player or null if none found.
 */
export function getFiguresOfPlayer(figList, colorPlayer){
    
    // Filter the list to get figures with corrresponding color and without 'FigureBack.png'
    const playerFigures = figList.filter((figProps) => {
        return figProps.color === colorPlayer && figProps.figName !== 'FigureBack.png'
    }); 
    return playerFigures || null
}

/**
 * Helper function to get the color of the player based on game states.
 * 
 * @function
 * @param {Object} gameStates - Object containing game-related states.
 * @property {boolean} gameStates.isPlayer1 - Indicates whether the current player is Player 1.
 * @property {string} gameStates.colorPlayer - Color chosen by Player 1.
 * @returns {string|null} colorPlayer: Color of the current player or null if not determined.
 */
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


