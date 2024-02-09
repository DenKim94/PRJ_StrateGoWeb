/** Main file for setting parameters [developer file]
 * This file is mandatory to run the application! 
 * - Developer: D.Kim
 * - Dateof last changes: 09.02.2024  
*/

/**** General/Global Configurations ****/
export const genCfg = {
    debugMode: false,               // Boolean for showing parameter values in the console (if true) 
    maxConnectionAttempts: 3,       // Maximum number of attempts to reconnect the user in case of failed connection
    minInputLength: 2,              // Minimal length of user input (> 1 e.g. user name)
    maxInputLength: 20,             // Maximal length of user input 
    timeOutAutoClose_ms: 4000,      // Time value in ms for auto close (e.g. Pop-Ups)  
    timeOutFunction_ms: 4500,       // Time value in ms for time-out function
};

/**** Settings for GameSection-Component: GameField ****/
export const gameFieldObj = {
    fieldWidth: 550,                         // Width of the game field in pixel (without distances to the y-axis) 
    fieldHeight: 550,                        // Height of the game field in pixel (without distances to the x-axis) 
    backgroundColor: 'lightgoldenrodyellow', // Background color of the game field 
    coordsNonPlayableFields:[                // Array with coordinates of non playable fields [col,row] 
        ["C",5],["C",6],
        ["D",5],["D",6],
        ["G",5],["G",6],
        ["H",5],["H",6],
    ],
    arrayLengthAxis: 10,                     // Length of the array to set axis properties
    arrayLengthGameFields: 100,              // Length of the array to set game field properties
    prefixID: 'SingleField',                 // Prefix for the id of a single field [String]   
    colorNonPlayableFields: '#ADD8E6',       // Color (Colorcode) of non playable fields [String]
    Letters2Numbers: { "A": 1, "B": 2, "C": 3, "D": 4, "E": 5, 
                       "F": 6, "G": 7, "H": 8, "I": 9, "J": 10 }, // Dictionary to translate letters to corresponding numbers 
};

// Total width and height of the game field in pixel (including distances to the axes)
const totalGameFieldSize = 700;  

/***  Calculate size of a game figure ***/
const figWidth = (gameFieldObj.fieldWidth)*0.95/10 ;  // figure width in pixel
const figHeight = (gameFieldObj.fieldWidth)*0.95/10 ; // figure height in pixel
const figSize = [figWidth,figHeight];

/***************** Set and export style and property parameters for components *****************/

// Main Component: App
export const styleApp = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',    
    height: '100vh',        // Relative height of the component
    backgroundColor: 'rgb(136, 107, 107)',
};
export const styleUiContainer = {
    maxHeight: '1000px',
    right: '50px',
    left: '80px',
};

// Generic Component: GameLogo
export const styleGameLogo = {
    fontFamily: 'Young Serif, serif',
    fontSize: '40px',
    color: 'rgb(248, 202, 45)',
    position: 'relative',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: '10px',
    marginBottom: '10px',
    textShadow: '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black'
};

/**** Settings for HomeSection-Component: HomeSection ****/
export const homeSectionProps = {
    inputPlaceHolder: "Player Name", // Placeholder for the user input
    style:{
        fontFamily: 'Young Serif, serif',
        fontSize: '20px',
        marginTop: '60px', 
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputStyle:{
        marginBottom: '10px', 
        height: '35px',
        width: '250px',
        borderRadius: '5px',
        fontWeight: "lighter",
        textAlign: 'center'       
    }
};

// HomeSection-Component: SetUp
export const setUpProps = {
    messages:{
        player1: "Please enter the game settings to create a new game.",
        player2: "Please enter the name of your opponent to join the game."
    },
    style:{
        fontFamily: 'Young Serif, serif',
        marginTop: '20px',
        marginBottom: '20px',
        alignItems: 'center',
        justifyContent: 'center', 
        display: 'flex',
        flexDirection: 'column', 
        gap: "10px",
    },
    inputStyle:{
        border:'1px solid black', 
        borderRadius: '5px',
        height: '35px',
        width: '250px',
        fontWeight: "lighter",
        textAlign: 'center'
    }
};

/**** Settings for GameSection-Component: GameField ****/
export const styleDnDContainer = {
    display: 'flex',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '3vh',    
};

export const styleGameFieldContainer = {
    display: 'flex',  
    position: 'relative',   
    width: `${totalGameFieldSize}px`,
    height: `${totalGameFieldSize}px`,
    backgroundColor: 'rgb(176, 175, 175)',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid black',
    borderRadius: '5px',
};

// GameSection-Component: FigureStorageTopic
export const styleStorageTopic = {
    fontFamily: 'Young Serif, serif',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px',
};

// GameSection-Component: SingleField
export const styleSingleField = {
    alignItems: 'center', 
    justifyContent: 'center', 
  };

// GameSection-Component: GameFigure
export const styleGameFigure = {
    width: `${figSize[0]}px`, 
    height: `${figSize[1]}px`,
    margin: 'auto', 
    display: 'flex',
    alignItems: 'flex-start', 
    justifyContent: 'flex-start', 
    cursor: 'grab',
    position: 'relative', 
  };

  export const valueStyleGameFigure = {
    fontSize: '12px', // Passen Sie die Schriftgröße an
    position: 'absolute',
    color: 'white',
    backgroundColor: 'black',
    padding: '1px 1px',
    borderRadius: '3px', 
    top: '2px', // Passe den Abstand am unteren Rand an
    left: '2px', // Passe den Abstand am rechten Rand an        
  };

// GameSection-Component: xAxis
export const styleXAxis = {
    fontFamily: 'Young Serif, serif',
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', 
    top: '92%',
    marginTop: '5px',
};

// GameSection-Component: yAxis
export const styleYAxis = {
    fontFamily: 'Young Serif, serif',
    position: 'relative',
    left: '-25px',
    height: `${gameFieldObj.fieldHeight}px`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
};

// GameSection-Component: Button
export const styleButtonContainer = {
    fontFamily: 'Young Serif, serif',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    maxHeight: '200px',
    width: '80px',
    right: '20px',
    marginTop: '500px',    
};

export const styleButtonText = {
    marginTop: '8px',
    border: '1px solid black',
    textAlign: 'center',
    fontSize: '15px'    
};

// GameSection-Component: Cover
export const styleCover = {
    position: 'absolute',
    fontFamily: 'Young Serif, serif',
    top: '0px',
    left: '80px',
    width: `${totalGameFieldSize}px`,
    height: `${totalGameFieldSize/2 + (gameFieldObj.fieldWidth)/10}px`,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',  
    backgroundColor: 'rgba(0, 0, 0, 0.9)',  
    zIndex: 2,                                  // Second layer to cover the GameField-Component
    transition: 'opacity 0.5s ease-out',        // Transition presets   
};  

// GameSection-Component: CoverContent
export const coverContent = {
    messageBeforeStart: "* Set up you game figures and get ready for the battle! *",
    messageWhilePause: "* Paused Game! *",  
    messageAtExit: "* You are leaving! *",
    styleCoverContent:{
        display: 'flex',
        position: 'relative',
        fontFamily: 'Young Serif, serif', 
        alignItems: 'center',
        justifyContent: 'center', 
        color: 'white',  
        top: '25px',      
    },                   
};

// GameSection-Component: ExitBox 
export const exitBoxProps = {
    message: "Are you sure to leave the game?",
    styleParamsMessage:{
        margin: 'auto',
        colorText: 'black', 
    },    
    styleParamsBox:{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        fontFamily: 'Young Serif, serif', 
        margin: 'auto',
        backgroundColor: 'rgb(248, 202, 45)',
        borderRadius: '5px',         
        width: `${totalGameFieldSize/2}px`,
        top: `${(totalGameFieldSize/2 + (gameFieldObj.fieldWidth)/10)/2}px`,
    },
    styleParamsButtons:{
        fontFamily: 'Young Serif, serif',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',  
        marginTop: '10px',
        marginBottom: '10px',
        gap: '10px',     
    }
};

/**** Settings for ExitSection-Component: ExitSection ****/
export const exitSectionProps = {
    message: "You have successfully left the game. You can close the window.",
    style:{
        fontFamily: 'Young Serif, serif',
        fontSize: '20px',
        margin: 'auto', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
    },
};

export const pageNotFoundProps = {
    message: "Error: Page not found.",
    style:{
        fontFamily: 'Young Serif, serif',
        fontSize: '25px',
        margin: 'auto', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#8b0000',
    },        
};

/**** Presets for GameSection-Component: GameFigure ****/
/* Default paths to images */
const path_redFig = "assets/images/redFigures/" ;
const path_blueFig = "assets/images/blueFigures/" ;
const path_deadFig = "assets/images/deadFigures/" ;

/* Array of figure names: Entries must be equal to the stored image names */
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

/*** Figure properties -> {id, imgPath: [path_fig_active, path_fig_inactive], value, size, figName, color} ***/
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


/*** Set default values of properties (if not defined) ***/
gameFieldObj.defaultProps = {
    fieldWidth: 550,                         // Width of the game field in pixel (without distances to the y-axis) 
    fieldHeight: 550,                        // Height of the game field in pixel (without distances to the x-axis) 
    backgroundColor: 'lightgoldenrodyellow', // Background color of the game field 
    coordsNonPlayableFields:[                // Array with coordinates of non playable fields [col,row] 
        ["C",5],["C",6],
        ["D",5],["D",6],
        ["G",5],["G",6],
        ["H",5],["H",6],
    ],
    arrayLengthAxis: 10,
    arrayLengthGameFields: 100,             
    prefixID: 'SingleField',                 // Prefix for the id of a single field [String]   
    colorNonPlayableFields: '#ADD8E6',       // Color (Colorcode) of non playable fields [String]
    Letters2Numbers: { "A": 1, "B": 2, "C": 3, "D": 4, "E": 5, 
                       "F": 6, "G": 7, "H": 8, "I": 9, "J": 10 }, // Dictionary to translate letters to corresponding numbers 

};