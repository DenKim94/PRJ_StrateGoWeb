/**** Main file for setting required parameters ****/
/**** Date: 13.08.2023 ****/

/**** Component: GameField ****/
export const gameFieldStruct = {
    fieldWidth: 550,                         /* Width of the game field in pixel */
    fieldHeight: 550,                        /* Height of the game field in pixel */
    backgroundColor: 'lightgoldenrodyellow', /* Background color of the game field */
    coordsNonPlayableFields:[                /* Array with coordinates of non playable fields [col,row] */
        ["C","5"],["C","6"],
        ["D","5"],["D","6"],
        ["G","5"],["G","6"],
        ["H","5"],["H","6"],
    ],
    colorNonPlayableFields: '#ADD8E6'       // Color (Colorcode) of non playable fields [String]
};
