/**** Main file for setting parameters [for developer] ****/
/**** Date: 29.10.2023 ****/

/**** General/Global Configurations ****/
export const genCfg = {
    debugMode: false,  /* Boolean for showing parameter values in the console (if true) */
};

/**** Settings for Component: GameField ****/
export const gameFieldObj = {
    fieldWidth: 550,                         /* Width of the game field in pixel */
    fieldHeight: 550,                        /* Height of the game field in pixel */
    backgroundColor: 'lightgoldenrodyellow', /* Background color of the game field */
    coordsNonPlayableFields:[                /* Array with coordinates of non playable fields [col,row] */
        ["C",5],["C",6],
        ["D",5],["D",6],
        ["G",5],["G",6],
        ["H",5],["H",6],
    ],
    prefixID: 'SingleField',                 /* Prefix for the id of a single field */   
    colorNonPlayableFields: '#ADD8E6',       /* Color (Colorcode) of non playable fields [String] */
};

/**** Settings for Component: GameFigure ****/
/* Default paths to images */
const path_redFig = "assets/images/redFigures/" ;
const path_blueFig = "assets/images/blueFigures/" ;
const path_deadFig = "assets/images/deadFigures/" ;

/* Array of figure names: 
   Entries must be equal to the stored image names */
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

/* Figure properties -> {id, imgPath: [path_fig_active, path_fig_inactive], value, size, figName, color} */
export const figProperties = [
    {id: 1, imgPath: [path_redFig+figNames[9],path_deadFig+figNames[9]], value: 1, size: figSize, figName: figNames[9], color: "red"},
    {id: 2, imgPath: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8], color: "red"},
    {id: 3, imgPath: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8], color: "red"},
    {id: 4, imgPath: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8], color: "red"},
    {id: 5, imgPath: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8], color: "red"},
    {id: 6, imgPath: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8], color: "red"},
    {id: 7, imgPath: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8], color: "red"},
    {id: 8, imgPath: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8], color: "red"},
    {id: 9, imgPath: [path_redFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize, figName: figNames[8], color: "red"},
    {id: 10,imgPath: [path_redFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize,figName: figNames[7], color: "red"},
    {id: 11,imgPath: [path_redFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize,figName: figNames[7], color: "red"},
    {id: 12,imgPath: [path_redFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize,figName: figNames[7], color: "red"},
    {id: 13,imgPath: [path_redFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize,figName: figNames[7], color: "red"},
    {id: 14,imgPath: [path_redFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize,figName: figNames[7], color: "red"},
    {id: 15,imgPath: [path_redFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize,figName: figNames[6], color: "red"},
    {id: 16,imgPath: [path_redFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize,figName: figNames[6], color: "red"},
    {id: 17,imgPath: [path_redFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize,figName: figNames[6], color: "red"},
    {id: 18,imgPath: [path_redFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize,figName: figNames[6], color: "red"},
    {id: 19,imgPath: [path_redFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize,figName: figNames[5], color: "red"},
    {id: 20,imgPath: [path_redFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize,figName: figNames[5], color: "red"},
    {id: 21,imgPath: [path_redFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize,figName: figNames[5], color: "red"},
    {id: 22,imgPath: [path_redFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize,figName: figNames[5], color: "red"},
    {id: 23,imgPath: [path_redFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize,figName: figNames[4], color: "red"},
    {id: 24,imgPath: [path_redFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize,figName: figNames[4], color: "red"},
    {id: 25,imgPath: [path_redFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize,figName: figNames[4], color: "red"},
    {id: 26,imgPath: [path_redFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize,figName: figNames[4], color: "red"},
    {id: 27,imgPath: [path_redFig+figNames[3],path_deadFig+figNames[3]], value: 7, size: figSize,figName: figNames[3], color: "red"},
    {id: 28,imgPath: [path_redFig+figNames[3],path_deadFig+figNames[3]], value: 7, size: figSize,figName: figNames[3], color: "red"},
    {id: 29,imgPath: [path_redFig+figNames[3],path_deadFig+figNames[3]], value: 7, size: figSize,figName: figNames[3], color: "red"},
    {id: 30,imgPath: [path_redFig+figNames[2],path_deadFig+figNames[2]], value: 8, size: figSize,figName: figNames[2], color: "red"},
    {id: 31,imgPath: [path_redFig+figNames[2],path_deadFig+figNames[2]], value: 8, size: figSize,figName: figNames[2], color: "red"},
    {id: 32,imgPath: [path_redFig+figNames[1],path_deadFig+figNames[1]], value: 9, size: figSize,figName: figNames[1], color: "red"},
    {id: 33,imgPath: [path_redFig+figNames[0],path_deadFig+"r_"+figNames[0]], value: 10, size: figSize,figName: figNames[0], color: "red"},
    {id: 34,imgPath: [path_redFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize,figName: figNames[10], color: "red"},
    {id: 35,imgPath: [path_redFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize,figName: figNames[10], color: "red"},
    {id: 36,imgPath: [path_redFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize,figName: figNames[10], color: "red"},
    {id: 37,imgPath: [path_redFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize,figName: figNames[10], color: "red"},
    {id: 38,imgPath: [path_redFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize,figName: figNames[10], color: "red"},
    {id: 39,imgPath: [path_redFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize,figName: figNames[10], color: "red"},
    {id: 40,imgPath: [path_redFig+figNames[11],path_deadFig+figNames[11]], value: 0, size: figSize,figName: figNames[11], color: "red"},
    {id: 41,imgPath: [path_redFig+figNames[12],path_deadFig+figNames[12]], value: 0, size: figSize,figName: figNames[12], color: "red"},
    {id: 42,imgPath: [path_blueFig+figNames[9],path_deadFig+figNames[9]], value: 1, size: figSize,figName: figNames[9], color: "blue"},
    {id: 43,imgPath: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize,figName: figNames[8], color: "blue"},
    {id: 44,imgPath: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize,figName: figNames[8], color: "blue"},
    {id: 45,imgPath: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize,figName: figNames[8], color: "blue"},
    {id: 46,imgPath: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize,figName: figNames[8], color: "blue"},
    {id: 47,imgPath: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize,figName: figNames[8], color: "blue"},
    {id: 48,imgPath: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize,figName: figNames[8], color: "blue"},
    {id: 49,imgPath: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize,figName: figNames[8], color: "blue"},
    {id: 50,imgPath: [path_blueFig+figNames[8],path_deadFig+figNames[8]], value: 2, size: figSize,figName: figNames[8], color: "blue"},
    {id: 51,imgPath: [path_blueFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize,figName: figNames[7], color: "blue"},
    {id: 52,imgPath: [path_blueFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize,figName: figNames[7], color: "blue"},
    {id: 53,imgPath: [path_blueFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize,figName: figNames[7], color: "blue"},
    {id: 54,imgPath: [path_blueFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize,figName: figNames[7], color: "blue"},
    {id: 55,imgPath: [path_blueFig+figNames[7],path_deadFig+figNames[7]], value: 3, size: figSize,figName: figNames[7], color: "blue"},
    {id: 56,imgPath: [path_blueFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize,figName: figNames[6], color: "blue"},
    {id: 57,imgPath: [path_blueFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize,figName: figNames[6], color: "blue"},
    {id: 58,imgPath: [path_blueFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize,figName: figNames[6], color: "blue"},
    {id: 59,imgPath: [path_blueFig+figNames[6],path_deadFig+figNames[6]], value: 4, size: figSize,figName: figNames[6], color: "blue"},
    {id: 60,imgPath: [path_blueFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize,figName: figNames[5], color: "blue"},
    {id: 61,imgPath: [path_blueFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize,figName: figNames[5], color: "blue"},
    {id: 62,imgPath: [path_blueFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize,figName: figNames[5], color: "blue"},
    {id: 63,imgPath: [path_blueFig+figNames[5],path_deadFig+figNames[5]], value: 5, size: figSize,figName: figNames[5], color: "blue"},
    {id: 64,imgPath: [path_blueFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize,figName: figNames[4], color: "blue"},
    {id: 65,imgPath: [path_blueFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize,figName: figNames[4], color: "blue"},
    {id: 66,imgPath: [path_blueFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize,figName: figNames[4], color: "blue"},
    {id: 67,imgPath: [path_blueFig+figNames[4],path_deadFig+figNames[4]], value: 6, size: figSize,figName: figNames[4], color: "blue"},
    {id: 68,imgPath: [path_blueFig+figNames[3],path_deadFig+figNames[3]], value: 7, size: figSize,figName: figNames[3], color: "blue"},
    {id: 69,imgPath: [path_blueFig+figNames[3],path_deadFig+figNames[3]], value: 7, size: figSize,figName: figNames[3], color: "blue"},
    {id: 70,imgPath: [path_blueFig+figNames[3],path_deadFig+figNames[3]], value: 7, size: figSize,figName: figNames[3], color: "blue"},
    {id: 71,imgPath: [path_blueFig+figNames[2],path_deadFig+figNames[2]], value: 8, size: figSize,figName: figNames[2], color: "blue"},
    {id: 72,imgPath: [path_blueFig+figNames[2],path_deadFig+figNames[2]], value: 8, size: figSize,figName: figNames[2], color: "blue"},
    {id: 73,imgPath: [path_blueFig+figNames[1],path_deadFig+figNames[1]], value: 9, size: figSize,figName: figNames[1], color: "blue"},
    {id: 74,imgPath: [path_blueFig+figNames[0],path_deadFig+"b_"+figNames[0]], value: 10, size: figSize,figName: figNames[0], color: "blue"},
    {id: 75,imgPath: [path_blueFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize,figName: figNames[10], color: "blue"},
    {id: 76,imgPath: [path_blueFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize,figName: figNames[10], color: "blue"},
    {id: 77,imgPath: [path_blueFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize,figName: figNames[10], color: "blue"},
    {id: 78,imgPath: [path_blueFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize,figName: figNames[10], color: "blue"},
    {id: 79,imgPath: [path_blueFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize,figName: figNames[10], color: "blue"},
    {id: 80,imgPath: [path_blueFig+figNames[10],path_deadFig+figNames[10]], value: 100, size: figSize,figName: figNames[10], color: "blue"},
    {id: 81,imgPath: [path_blueFig+figNames[11],path_deadFig+figNames[11]], value: 0, size: figSize,figName: figNames[11], color: "blue"},
    {id: 82,imgPath: [path_blueFig+figNames[12],path_deadFig+figNames[12]], value: 0, size: figSize, figName: figNames[12], color: "blue"}   
    ];


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