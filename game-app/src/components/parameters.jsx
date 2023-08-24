/**** Main file for setting required parameters ****/
/**** Date: 20.08.2023 ****/

/**** General/Global Configurations ****/
export const genCfg = {
    debugMode: false   /* Boolean for showing parameter values in the console (if true) */
};

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

/**** Component: GameFigure ****/
export const gameFiguresStruct = {
    path_redFig: "assets/images/redFigures/",
    path_blueFig: "assets/images/blueFigures/",
    path_deadFig: "assets/images/deadFigures/",
    figWidth: 10,
    figHeight: 10
};


/* To-Do: Set default values of properties (if not defined) */
/* gameFieldStruct.defaultProps = {
    fieldWidth: 500,
    fieldHeight: 500,
    backgroundColor: 'lightgoldenrodyellow',
    coordsNonPlayableFields:[                
    ["C","5"],["C","6"],
    ["D","5"],["D","6"],
    ["G","5"],["G","6"],
    ["H","5"],["H","6"],
    ],
    colorNonPlayableFields: 'brown' 
  }; */