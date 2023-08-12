/**** Helper function to create a single field with defined properties ****/
/* *** 
Input: 
Output: 
    singleFieldProps = {
        index: tmp_idx [Num],
        pos_x = xCoord [Num],
        pos_y = yCoord [[Num]],
        class_name = 'singleField_'+tmp_index,
        style = {
            width: sizeSingleField,
            height: sizeSingleField,
            backgroundColor: backgroundColor, // Hintergrundfarbe des Spielfeldes
            border: '1px solid black' // Schwarze Linien um jedes Spielfeldquadrat 
        }
    } 
*** */
export const setProps4SingleField = (xCoord,yCoord,sizeSingleField) => {
    let singleFieldProps = {};
    console.log(">> Function in Progress...")
};

export function getCoordinatesArray(xCoordArray,yCoordArray){
    const coordinatesArray = xCoordArray.flatMap((xVal) => 
        yCoordArray.map((yVal) => xVal + yVal)
    );
    return coordinatesArray
};



