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
export const setProps4SingleField = (index,fieldCoordinates,sizeSingleField,backgroundColor) => {
    let singleFieldProps = {
        id: `singleField_${index}`,
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
        xCoordArray.map((xVal) => [xVal, yVal])
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
export function getFigures4Player(figList, playerColor){
    // TO-DO: Return an array of corresponding figures for the player (depends of color) 


    
}