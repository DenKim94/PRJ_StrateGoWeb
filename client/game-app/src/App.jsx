import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import * as parameters from './game-logic/parameters';
import GameLogo from './components/gameSection/GameLogo';  
import HomeSection from './components/homeSection/HomeSection';
import GameSection from './components/gameSection/GameSection'; 
import ExitSection from './components/exitSection/ExitSection';  

/* ******************************************************************* */ 

const App = () => {
  
    // Add Button States by using default values
    const [buttonStates, setButtonStates] = useState({

        pauseButtonText: "Pause Game", // default value [string]
        startButtonText: "Start Game", // default value [string]
        exitButtonText: "Exit Game",   // default value [string]
        disabledStartButton: true,     // default value [boolean]
        counterUsedStartButton: 0,     // default value [integer]

    });  

    // Add general Game States by using default values
    const [gameStates, setGameStates] = useState({
        colorPlayer: 'red',    // placeholder: player color [string] --> Has to be set by player 1
        isPlayer1: true,       // placeholder: variable [boolean] to identify player 1 
        ready2Play: false,     // default value [boolean]
        isPaused: false,       // default value [boolean] 
        leaveGame: false,      // default value [boolean]  
        exitConfirmed: false,  // default value [boolean]   
        exitCanceled: false,   // default value [boolean]   
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
        // Set ready2Play = false to exit game
        setGameStates((prevStates) => ({
            ...prevStates,
            ready2Play: false,
            isPaused: false, 
            leaveGame: true,       
        })); 

        /* To-Do: 10.12.2023
        1) Ask the user to confirm leaving the game [Done]
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


    useEffect(() => {

    })

    if(parameters.genCfg.debugMode){
        console.log("######################### App #############################")
        console.log(">> gameStates: ", gameStates)
        console.log(">> buttonStates: ", buttonStates)
        console.log("##########################################################")
    }

    /*** Rendering the components ***/  
    return(
        <Router>
            <div className = "App" style={parameters.styleApp}> 
                <GameLogo/> 
                <Routes>
                    <Route exact path = "/home" Component={(routeProps) => (
                        <HomeSection 
                        {...routeProps}
                        GameStates = {gameStates} setGameStates={setGameStates}/>
                        )
                    }/>
                    <Route exact path = "/" Component={(routeProps) => (
                        <GameSection 
                        {...routeProps}
                        gameStates={gameStates} setGameStates={setGameStates}
                        buttonStates={buttonStates} setButtonStates={setButtonStates}
                        startGame={startGame} pauseGame={pauseGame} exitGame={exitGame}/>                       
                        )
                    }/>
                    <Route exact path = "/exitSection" Component={ ExitSection } />                    
                </Routes>                       
            </div> 
        </Router>      
    )
};
 
export default App;