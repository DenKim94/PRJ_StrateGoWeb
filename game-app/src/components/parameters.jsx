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
/* Path to images */
const path_redFig = "assets/images/redFigures/" ;
const path_blueFig = "assets/images/blueFigures/" ;
const path_deadFig = "assets/images/deadFigures/" ;

/* Array of figure names */
const figNames = ["Marshal.png",
                "General.png",
                "Colonel.png",
                "Major.png",
                "Captain.png",
                "Leutnant.png",
                "Corporal.png",
                "Miner.png",
                "Scout.png",
                "Spy.png",
                "Bomb.png",
                "Flag.png",
                "FigureBack.png"];

/* Size of a figure */
const figWidth = 8 ;  // figure width in pixel
const figHeight = 8 ; // figure height in pixel
const figSize = [figWidth,figHeight];

/* properties = {id: {[path_fig_active, path_fig_inactive], value_fig, size_fig}, figName} */
export const figProperties = {
    1: {image: [path_redFig+figNames[9],path_deadFig+figNames[9]], value: 1, size: figSize, figName: figNames[9]},
    2: {image: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8]},
    3: {image: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8]},
    4: {image: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8]},
    5: {image: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8]},
    6: {image: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8]},
    7: {image: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8]},
    8: {image: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8]},
    9: {image: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8]},
    10: {image: [path_redFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, figName: figNames[7]},
    11: {image: [path_redFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, figName: figNames[7]},
    12: {image: [path_redFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, figName: figNames[7]},
    13: {image: [path_redFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, figName: figNames[7]},
    14: {image: [path_redFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, figName: figNames[7]},
    15: {image: [path_redFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize, figName: figNames[6]},
    16: {image: [path_redFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize, figName: figNames[6]},
    17: {image: [path_redFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize, figName: figNames[6]},
    18: {image: [path_redFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize, figName: figNames[6]},
    19: {image: [path_redFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize, figName: figNames[5]},
    20: {image: [path_redFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize, figName: figNames[5]},
    21: {image: [path_redFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize, figName: figNames[5]},
    22: {image: [path_redFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize, figName: figNames[5]},
    23: {image: [path_redFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize, figName: figNames[4]},
    24: {image: [path_redFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize, figName: figNames[4]},
    25: {image: [path_redFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize, figName: figNames[4]},
    26: {image: [path_redFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize, figName: figNames[4]},
    27: {image: [path_redFig+figNames[3],path_deadFig+figNames[3]], value: 7, size: figSize, figName: figNames[3]},
    28: {image: [path_redFig+figNames[3],path_deadFig+figNames[3]], value: 7, size: figSize, figName: figNames[3]},
    29: {image: [path_redFig+figNames[3],path_deadFig+figNames[3]], value: 7, size: figSize, figName: figNames[3]},
    30: {image: [path_redFig+figNames[2],path_deadFig+figNames[2]], value: 8, size: figSize, figName: figNames[2]},
    31: {image: [path_redFig+figNames[2],path_deadFig+figNames[2]], value: 8, size: figSize, figName: figNames[2]},
    32: {image: [path_redFig+figNames[1],path_deadFig+figNames[1]], value: 9, size: figSize, figName: figNames[1]},
    33: {image: [path_redFig+figNames[0],path_deadFig+"r_"+figNames[0]], value: 10, size: figSize, figName: figNames[0]},
    34: {image: [path_redFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, figName: figNames[10]},
    35: {image: [path_redFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, figName: figNames[10]},
    36: {image: [path_redFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, figName: figNames[10]},
    37: {image: [path_redFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, figName: figNames[10]},
    38: {image: [path_redFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, figName: figNames[10]},
    39: {image: [path_redFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, figName: figNames[10]},
    40: {image: [path_redFig+figNames[11],path_deadFig+figNames[11]], value: 0, size: figSize, figName: figNames[11]},
    41: {image: [path_redFig+figNames[12],path_deadFig+figNames[12]], value: 0, size: figSize, figName: figNames[12]},
    42: {image: [path_blueFig+figNames[9],path_deadFig+figNames[9]], value: 1, size: figSize, figName: figNames[9]},
    43: {image: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8]},
    44: {image: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8]},
    45: {image: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8]},
    46: {image: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8]},
    47: {image: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8]},
    48: {image: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8]},
    49: {image: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8]},
    50: {image: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8]},
    51: {image: [path_blueFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, figName: figNames[7]},
    52: {image: [path_blueFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, figName: figNames[7]},
    53: {image: [path_blueFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, figName: figNames[7]},
    54: {image: [path_blueFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, figName: figNames[7]},
    55: {image: [path_blueFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize, figName: figNames[7]},
    56: {image: [path_blueFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize, figName: figNames[6]},
    57: {image: [path_blueFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize, figName: figNames[6]},
    58: {image: [path_blueFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize, figName: figNames[6]},
    59: {image: [path_blueFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize, figName: figNames[6]},
    60: {image: [path_blueFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize, figName: figNames[5]},
    61: {image: [path_blueFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize, figName: figNames[5]},
    62: {image: [path_blueFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize, figName: figNames[5]},
    63: {image: [path_blueFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize, figName: figNames[5]},
    64: {image: [path_blueFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize, figName: figNames[4]},
    65: {image: [path_blueFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize, figName: figNames[4]},
    66: {image: [path_blueFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize, figName: figNames[4]},
    67: {image: [path_blueFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize, figName: figNames[4]},
    68: {image: [path_blueFig+figNames[3],path_deadFig+figNames[3]], value: 7, size: figSize, figName: figNames[3]},
    69: {image: [path_blueFig+figNames[3],path_deadFig+figNames[3]], value: 7, size: figSize, figName: figNames[3]},
    70: {image: [path_blueFig+figNames[3],path_deadFig+figNames[3]], value: 7, size: figSize, figName: figNames[3]},
    71: {image: [path_blueFig+figNames[2],path_deadFig+figNames[2]], value: 8, size: figSize, figName: figNames[2]},
    72: {image: [path_blueFig+figNames[2],path_deadFig+figNames[2]], value: 8, size: figSize, figName: figNames[2]},
    73: {image: [path_blueFig+figNames[1],path_deadFig+figNames[1]], value: 9, size: figSize, figName: figNames[1]},
    74: {image: [path_blueFig+figNames[0],path_deadFig+"b_"+figNames[0]], value: 10, size: figSize, figName: figNames[0]},
    75: {image: [path_blueFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, figName: figNames[10]},
    76: {image: [path_blueFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, figName: figNames[10]},
    77: {image: [path_blueFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, figName: figNames[10]},
    78: {image: [path_blueFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, figName: figNames[10]},
    79: {image: [path_blueFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, figName: figNames[10]},
    80: {image: [path_blueFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize, figName: figNames[10]},
    81: {image: [path_blueFig+figNames[11],path_deadFig+figNames[11]], value: 0, size: figSize, figName: figNames[11]},
    82: {image: [path_blueFig+figNames[12],path_deadFig+figNames[12]], value: 0, size: figSize, figName: figNames[12]}   
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