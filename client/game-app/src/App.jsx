import React, {useState, useEffect} from 'react';
import './App.css';
import * as parameters from './game-logic/parameters';
import GameField from './components/GameField';
import GameLogo from './components/GameLogo';  
import Cover from './components/Cover';
import './components/Buttons.css'

/* ******************************************************************* */ 

const App = () => {
  
    // Add Button States by using default values
    const [buttonStates, setButtonStates] = useState({

        pauseButtonText: "Pause Game", // default value [string]
        startButtonText: "Start Game", // default value [string]
        disabledStartButton: true,     // default value [boolean]
        counterUsedStartButton: 0,     // default value [integer]

    });  

    // Add general Game States by using default values
    const [gameStates, setGameStates] = useState({
        colorPlayer: 'red',    // placeholder: player color [string] --> Has to be set by player 1
        isPlayer1: true,       // placeholder: variable [boolean] to identify player 1 
        ready2Play: false,     // default value [boolean]
        isPaused: false,       // default value [boolean] 
        leavedGame: false,     // default value [boolean]        
    }); 

    /*** Functions after click the buttons ****/
    function startGame(){
        if(gameStates.isPaused){
            return
        }
        // Set parameter 'ready2Play' to 'true'
        setGameStates((prevStates) => ({
            ...prevStates,
            ready2Play: true,
        }));
        // Disable the start button after first usage and increase counter
        setButtonStates((prevStates) => ({
            ...prevStates,
            counterUsedStartButton: prevStates.counterUsedStartButton + 1,
        }));        
    }

    function pauseGame(){
        // To-Dos:
        if(!gameStates.isPaused){
            /* After pausing the game, change the button text 
            of 'Pause Game' to 'Proceed Game' */
            setButtonStates((prevStates) => ({
                ...prevStates,
                pauseButtonText: "Proceed Game",
            }));
            
            // Pause the timer of the game after triggering the event
            // In Progress...

            // Set ready2Play = false
            setGameStates((prevStates) => ({
                ...prevStates,
                ready2Play: false,
                isPaused: true,              
            }));              
        }
        else{
            /* After proceeding the game, change the button text 
            of 'Proceed Game' to 'Pause Game' */
            setButtonStates((prevStates) => ({
                ...prevStates,
                pauseButtonText: "Pause Game",
            }));            

            // Activate the timer (without resetting) to proceed
            // In Progress...

            if(buttonStates.counterUsedStartButton === 0){
                // Set isPaused: false to proceed
                setGameStates((prevStates) => ({
                    ...prevStates,
                    isPaused: false, 
                })); 
            }
            else{
                /* Set ready2Play = true and isPaused: false to proceed, 
                when start button was used once */
                setGameStates((prevStates) => ({
                    ...prevStates,
                    ready2Play: true,
                    isPaused: false, 
                })); 
            } 
        }
    }

    function exitGame(){
        console.log(">> Exit Game: In Progress...")
        // Set ready2Play = false to exit game
        setGameStates((prevStates) => ({
            ...prevStates,
            ready2Play: false,
            isPaused: false, 
            leavedGame: true,       
        })); 

        /* To-Do: 03.12.2023
        1) Ask the user to confirm leaving the game
        2) Open the exit-page after confirmation */

    }

    // Change the functionality of the Start Button after starting the game
    useEffect(() => {
        const changeStartButton = () => {
            if (buttonStates.counterUsedStartButton > 0) {
                setButtonStates((prevStates) => ({
                    ...prevStates,
                    startButtonText: "End Turn",
                }));
            }
        }; 
    
        changeStartButton()
        }, [buttonStates.counterUsedStartButton])


    if(parameters.genCfg.debugMode){
        console.log("######################### App #############################")
        console.log(">> gameStates: ", gameStates)
        console.log(">> buttonStates: ", buttonStates)
        console.log("##########################################################")
    }

    /*** Rendering the components ***/  
    return(
        <div className = "App" style={parameters.styleApp}> 
            <GameLogo/> 
            <div className="ui-container" style={parameters.styleUIContainer}>
            <Cover GameStates={gameStates} className={gameStates.ready2Play ? '' : 'Cover-FadeOut'} />
                <div className="btn-container" style = {parameters.styleButtonContainer}>
                    <button type="button" 
                            id={!buttonStates.disabledStartButton ? "highlighted-button": ''}
                            className = "btn btn-warning"
                            style={parameters.styleButtonText}
                            onClick={startGame} 
                            disabled = {gameStates.leavedGame ? true : buttonStates.disabledStartButton} >
                        {buttonStates.startButtonText}
                    </button> 
                    <button type="button" 
                            className="btn btn-warning" 
                            style={parameters.styleButtonText} 
                            onClick={pauseGame}
                            disabled = {gameStates.leavedGame ? true : false}>
                        {buttonStates.pauseButtonText}
                    </button>  
                    <button type="button" 
                            className="btn btn-warning" 
                            style={parameters.styleButtonText} 
                            onClick={exitGame}>
                        {'Exit Game'}
                    </button>                                                            
                </div>
                <GameField gameFieldSettings = {parameters.gameFieldObj} 
                           gameSettings = {gameStates} 
                           buttonStates = {buttonStates}
                           setStartButtonState = {setButtonStates} /> 
            </div>
        </div>       
    )
};
 
export default App;