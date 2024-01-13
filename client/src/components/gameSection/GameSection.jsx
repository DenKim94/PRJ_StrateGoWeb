import React, { useEffect } from "react";
import * as parameters from '../../game-logic/parameters.js';
import GameField from './GameField';  
import { useButtonStates } from '../context/ButtonStatesContext.js';
import { useGameStates } from '../context/GameStatesContext.js';
import Cover from './Cover';
import './Buttons.css'

/** 
 * - This Component manages the game interactions 
 * - This Component will be rendered after the user is checked in successfully 
 * 
*/

const GameSection = () => {

    const { buttonStates, setButtonStates } = useButtonStates();
    const { gameStates, setGameStates } = useGameStates();

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
            leaveGame: true,       
        })); 
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
        }, [buttonStates.counterUsedStartButton, setButtonStates])

    if(parameters.genCfg.debugMode){
        console.log("######################### App #############################")
        console.log(">> gameStates: ", gameStates)
        console.log(">> buttonStates: ", buttonStates)
        console.log("##########################################################")
    }

    return(
        <div className="ui-container" >
        {!gameStates.ready2Play && (<Cover className={gameStates.ready2Play ? '' : 'Cover-FadeOut'} />)}
            <div className="btn-container" style = {parameters.styleButtonContainer}>
                <button type="button" 
                        id={!buttonStates.disabledStartButton ? "highlighted-button": ''}
                        className = "btn btn-warning"
                        style={parameters.styleButtonText}
                        onClick={startGame} 
                        disabled = {gameStates.leaveGame || gameStates.isPaused ? true : buttonStates.disabledStartButton} >
                    {buttonStates.startButtonText}
                </button> 
                <button type="button" 
                        className="btn btn-warning" 
                        style={parameters.styleButtonText} 
                        onClick={pauseGame}
                        disabled = {gameStates.leaveGame ? true : false}>
                    {buttonStates.pauseButtonText}
                </button>  
                <button type="button" 
                        className="btn btn-warning" 
                        style={parameters.styleButtonText} 
                        onClick={exitGame}>
                    {buttonStates.exitButtonText}
                </button>                                                            
            </div>
            <GameField /> 
        </div>         
    )
};
export default GameSection