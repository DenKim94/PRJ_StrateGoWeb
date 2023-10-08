/**** Main file for setting required parameters ****/
/**** Date: 08.10.2023 ****/

/**** General/Global Configurations ****/
export const genCfg = {
    debugMode: true   /* Boolean for showing parameter values in the console (if true) */
};

/**** Component: GameField ****/
export const gameFieldObj = {
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
/* Path to images */
const path_redFig = "assets/images/redFigures/" ;
const path_blueFig = "assets/images/blueFigures/" ;
const path_deadFig = "assets/images/deadFigures/" ;

/* Array of figure names: 
   Entries must be equal to the corresponding image names */
const figNames = ["Marshal.png",    // index: 0
                "General.png",      // index: 1
                "Colonel.png",      // index: 2
                "Major.png",        // index: 3
                "Captain.png",      // index: 4
                "Leutnant.png",     // index: 5
                "Corporal.png",     // index: 6
                "Miner.png",        // index: 7
                "Scout.png",        // index: 8
                "Spy.png",          // index: 9
                "Bomb.png",         // index: 10
                "Flag.png",         // index: 11
                "FigureBack.png"];  // index: 12

/***  Calculate size of a figure ***/
const figWidth = (gameFieldObj.fieldWidth)*0.95/10 ;  // figure width in pixel
const figHeight = (gameFieldObj.fieldWidth)*0.95/10 ; // figure height in pixel
const figSize = [figWidth,figHeight];

/* Figure properties -> id: {imgPath: [path_fig_active, path_fig_inactive], value, size, figName, color} */
export const figProperties = {
    1: {imgPath: [path_redFig+figNames[9],path_deadFig+figNames[9]], value: 1, size: figSize, 
        figName: figNames[9], color: "red"},
    2: {imgPath: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, 
        figName: figNames[8], color: "red"},
    3: {imgPath: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, 
        figName: figNames[8], color: "red"},
    4: {imgPath: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, 
        figName: figNames[8], color: "red"},
    5: {imgPath: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, 
        figName: figNames[8], color: "red"},
    6: {imgPath: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, 
        figName: figNames[8], color: "red"},
    7: {imgPath: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, 
        figName: figNames[8], color: "red"},
    8: {imgPath: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, 
        figName: figNames[8], color: "red"},
    9: {imgPath: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, 
        figName: figNames[8], color: "red"},
    10: {imgPath: [path_redFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, 
        figName: figNames[7], color: "red"},
    11: {imgPath: [path_redFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, 
        figName: figNames[7], color: "red"},
    12: {imgPath: [path_redFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, 
        figName: figNames[7], color: "red"},
    13: {imgPath: [path_redFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, 
        figName: figNames[7], color: "red"},
    14: {imgPath: [path_redFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, 
        figName: figNames[7], color: "red"},
    15: {imgPath: [path_redFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize, 
        figName: figNames[6], color: "red"},
    16: {imgPath: [path_redFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize, 
        figName: figNames[6], color: "red"},
    17: {imgPath: [path_redFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize, 
        figName: figNames[6], color: "red"},
    18: {imgPath: [path_redFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize, 
        figName: figNames[6], color: "red"},
    19: {imgPath: [path_redFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize, 
        figName: figNames[5], color: "red"},
    20: {imgPath: [path_redFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize, 
        figName: figNames[5], color: "red"},
    21: {imgPath: [path_redFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize, 
        figName: figNames[5], color: "red"},
    22: {imgPath: [path_redFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize, 
        figName: figNames[5], color: "red"},
    23: {imgPath: [path_redFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize, 
        figName: figNames[4], color: "red"},
    24: {imgPath: [path_redFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize, 
        figName: figNames[4], color: "red"},
    25: {imgPath: [path_redFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize, 
        figName: figNames[4], color: "red"},
    26: {imgPath: [path_redFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize, 
        figName: figNames[4], color: "red"},
    27: {imgPath: [path_redFig+figNames[3],path_deadFig+figNames[3]], value: 7, size: figSize, 
        figName: figNames[3], color: "red"},
    28: {imgPath: [path_redFig+figNames[3],path_deadFig+figNames[3]], value: 7, size: figSize, 
        figName: figNames[3], color: "red"},
    29: {imgPath: [path_redFig+figNames[3],path_deadFig+figNames[3]], value: 7, size: figSize, 
        figName: figNames[3], color: "red"},
    30: {imgPath: [path_redFig+figNames[2],path_deadFig+figNames[2]], value: 8, size: figSize, 
        figName: figNames[2], color: "red"},
    31: {imgPath: [path_redFig+figNames[2],path_deadFig+figNames[2]], value: 8, size: figSize, 
        figName: figNames[2], color: "red"},
    32: {imgPath: [path_redFig+figNames[1],path_deadFig+figNames[1]], value: 9, size: figSize, 
        figName: figNames[1], color: "red"},
    33: {imgPath: [path_redFig+figNames[0],path_deadFig+"r_"+figNames[0]], value: 10, size: figSize, 
        figName: figNames[0], color: "red"},
    34: {imgPath: [path_redFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, 
        figName: figNames[10], color: "red"},
    35: {imgPath: [path_redFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, 
        figName: figNames[10], color: "red"},
    36: {imgPath: [path_redFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, 
        figName: figNames[10], color: "red"},
    37: {imgPath: [path_redFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, 
        figName: figNames[10], color: "red"},
    38: {imgPath: [path_redFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, 
        figName: figNames[10], color: "red"},
    39: {imgPath: [path_redFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, 
        figName: figNames[10], color: "red"},
    40: {imgPath: [path_redFig+figNames[11],path_deadFig+figNames[11]], value: 0, size: figSize, 
        figName: figNames[11], color: "red"},
    41: {imgPath: [path_redFig+figNames[12],path_deadFig+figNames[12]], value: 0, size: figSize, 
        figName: figNames[12], color: "red"},
    42: {imgPath: [path_blueFig+figNames[9],path_deadFig+figNames[9]], value: 1, size: figSize, 
        figName: figNames[9], color: "blue"},
    43: {imgPath: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, 
        figName: figNames[8], color: "blue"},
    44: {imgPath: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, 
        figName: figNames[8], color: "blue"},
    45: {imgPath: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, 
        figName: figNames[8], color: "blue"},
    46: {imgPath: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, 
        figName: figNames[8], color: "blue"},
    47: {imgPath: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, 
        figName: figNames[8], color: "blue"},
    48: {imgPath: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, 
        figName: figNames[8], color: "blue"},
    49: {imgPath: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, 
        figName: figNames[8], color: "blue"},
    50: {imgPath: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, 
        figName: figNames[8], color: "blue"},
    51: {imgPath: [path_blueFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, 
        figName: figNames[7], color: "blue"},
    52: {imgPath: [path_blueFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, 
        figName: figNames[7], color: "blue"},
    53: {imgPath: [path_blueFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, 
        figName: figNames[7], color: "blue"},
    54: {imgPath: [path_blueFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, 
        figName: figNames[7], color: "blue"},
    55: {imgPath: [path_blueFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, 
        figName: figNames[7], color: "blue"},
    56: {imgPath: [path_blueFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize, 
        figName: figNames[6], color: "blue"},
    57: {imgPath: [path_blueFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize, 
        figName: figNames[6], color: "blue"},
    58: {imgPath: [path_blueFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize, 
        figName: figNames[6], color: "blue"},
    59: {imgPath: [path_blueFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize, 
        figName: figNames[6], color: "blue"},
    60: {imgPath: [path_blueFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize, 
        figName: figNames[5], color: "blue"},
    61: {imgPath: [path_blueFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize, 
        figName: figNames[5], color: "blue"},
    62: {imgPath: [path_blueFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize, 
        figName: figNames[5], color: "blue"},
    63: {imgPath: [path_blueFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize, 
        figName: figNames[5], color: "blue"},
    64: {imgPath: [path_blueFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize, 
        figName: figNames[4], color: "blue"},
    65: {imgPath: [path_blueFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize, 
        figName: figNames[4], color: "blue"},
    66: {imgPath: [path_blueFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize, 
        figName: figNames[4], color: "blue"},
    67: {imgPath: [path_blueFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize, 
        figName: figNames[4], color: "blue"},
    68: {imgPath: [path_blueFig+figNames[3],path_deadFig+figNames[3]], value: 7, size: figSize, 
        figName: figNames[3], color: "blue"},
    69: {imgPath: [path_blueFig+figNames[3],path_deadFig+figNames[3]], value: 7, size: figSize, 
        figName: figNames[3], color: "blue"},
    70: {imgPath: [path_blueFig+figNames[3],path_deadFig+figNames[3]], value: 7, size: figSize, 
        figName: figNames[3], color: "blue"},
    71: {imgPath: [path_blueFig+figNames[2],path_deadFig+figNames[2]], value: 8, size: figSize, 
        figName: figNames[2], color: "blue"},
    72: {imgPath: [path_blueFig+figNames[2],path_deadFig+figNames[2]], value: 8, size: figSize, 
        figName: figNames[2], color: "blue"},
    73: {imgPath: [path_blueFig+figNames[1],path_deadFig+figNames[1]], value: 9, size: figSize, 
        figName: figNames[1], color: "blue"},
    74: {imgPath: [path_blueFig+figNames[0],path_deadFig+"b_"+figNames[0]], value: 10, size: figSize, 
        figName: figNames[0], color: "blue"},
    75: {imgPath: [path_blueFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, 
        figName: figNames[10], color: "blue"},
    76: {imgPath: [path_blueFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, 
        figName: figNames[10], color: "blue"},
    77: {imgPath: [path_blueFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, 
        figName: figNames[10], color: "blue"},
    78: {imgPath: [path_blueFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, 
        figName: figNames[10], color: "blue"},
    79: {imgPath: [path_blueFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, 
        figName: figNames[10], color: "blue"},
    80: {imgPath: [path_blueFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, 
        figName: figNames[10], color: "blue"},
    81: {imgPath: [path_blueFig+figNames[11],path_deadFig+figNames[11]], value: 0, size: figSize, 
        figName: figNames[11], color: "blue"},
    82: {imgPath: [path_blueFig+figNames[12],path_deadFig+figNames[12]], value: 0, size: figSize, 
        figName: figNames[12], color: "blue"}   
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