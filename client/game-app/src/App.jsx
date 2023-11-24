import React, {useState} from 'react';
import './App.css';
import * as parameters from './game-logic/parameters';
import GameField from './components/GameField';
import GameLogo from './components/GameLogo';  
import './components/Buttons.css'

/* ******************************************************************* */ 

const App = () => {
  
    // Add Button States by using default values
    const [buttonStates, setButtonStates] = useState({
        pauseButtonText: "Pause Game", // default value [string]
        disabledStartButton: false,             // default value [boolean]
    });  
    // Add general Game States by using default values
    const [gameStates, setGameStates] = useState({
        colorPlayer: 'blue',   // player color as placeholder [string] 
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
        // Disable the start button after first usage
        setButtonStates((prevStates) => ({
            ...prevStates,
            disabledStartButton: true,
        }));        
    }
    function pauseGame(){
        // To-Dos:
        if(!gameStates.isPaused){
            // Change the button text of 'Pause Game' to 'Proceed Game'
            setButtonStates((prevStates) => ({
                ...prevStates,
                pauseButtonText: "Proceed Game",
            }));
            
            // Pause the timer of the game after triggering the event

            // Pause the movements of figures (Drag-Drop-Events)
            // Set ready2Play = false
            setGameStates((prevStates) => ({
                ...prevStates,
                ready2Play: false,
                isPaused: true,              
            }));              
        }
        else{
            // Change the button text of 'Proceed Game' to 'Pause Game'
            setButtonStates((prevStates) => ({
                ...prevStates,
                pauseButtonText: "Pause Game",
            }));            

            // Activate the timer (without resetting) to proceed

            // Enable the movements of figures (Drag-Drop-Events) to proceed
            
            // Set ready2Play = true to proceed
            setGameStates((prevStates) => ({
                ...prevStates,
                ready2Play: true,
                isPaused: false, 
            }));  
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
        
    }
    
    if(parameters.genCfg.debugMode){
        console.log("##########################################################")
        console.log(">> gameStates: ", gameStates)
        console.log(">> buttonStates: ", buttonStates)
        console.log("##########################################################")
    }

    /*** Rendering the components ***/  
    return(
        <div className = "App"> 
            <GameLogo/> 
            <div className="ui-container">
                <div className="btn-container">
                    <button type="button" className="btn btn-warning" onClick={startGame} disabled = {buttonStates.disabledStartButton} >
                        {'Start Game'}
                    </button> 
                    <button type="button" className="btn btn-warning" onClick={pauseGame}>
                        {buttonStates.pauseButtonText}
                    </button>  
                    <button type="button" className="btn btn-warning" onClick={exitGame}>
                        {'Exit Game'}
                    </button>                                                            
                </div>
                <GameField gameFieldSettings = {parameters.gameFieldObj} gameSettings = {gameStates}/> 
            </div>
        </div>       
    )
};
 
export default App;