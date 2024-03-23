import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as parameters from '../../game-logic/parameters.js';
import GameField from './GameField';  
import { useButtonStates } from '../context/ButtonStatesContext.js';
import { useGameStates } from '../context/GameStatesContext.js';
import { useOpponentStates } from '../context/OpponentStatesContext.js';
import { ScoutStatesProvider } from '../context/ScoutStatesContext';
import { useChatContext } from 'stream-chat-react';
import { useChannelStates } from '../context/ChannelStatesContext.js';
import Cover from './Cover';
import './Buttons.css'

/**
 * React component responsible for managing game interactions.
 * @component
 */
const GameSection = () => {

    const { buttonStates, setButtonStates } = useButtonStates();
    const { channelStates } = useChannelStates();
    const { gameStates, setGameStates } = useGameStates();
    const { opponentStates, setOpponentStates } = useOpponentStates();
    const { client } = useChatContext();

    const [stateIsUpdated, setStateIsUpdated] = useState(false);

    const navigate = useNavigate();

    // Update states between both players
    useEffect(() => {
       
        const sendGameStateUpdates = async (gameStates) => {
            await channelStates.channelObj.sendEvent({
                type: "game-state-update",
                data: gameStates,
            })
        };

         // Function to provide states, which shall be updated
        const updateStates = async () => {
            try{
                await sendGameStateUpdates(gameStates);

            }catch(error){
                console.error(error.message);
            }
        };
        
        if(!stateIsUpdated){      
            updateStates();           
        }

    }, [gameStates, setGameStates, channelStates, stateIsUpdated]);

    useEffect(() => {

        // Inform player if the opponent has left the game
        if(opponentStates.exitConfirmed){
            setGameStates((prevStates) => ({
                ...prevStates,
                ready2Play: false,
                isPaused: true,
            }));          
        }

        if(gameStates.exitConfirmed){

            // Navigate the player to the exit section
            navigate("/exitSection")
        }

    }, [gameStates.exitConfirmed, stateIsUpdated, setGameStates, opponentStates.exitConfirmed, navigate])

    // Exchange game states between players 
    try{
        channelStates.channelObj.on((event) => {
            if(event.type === "game-state-update" && event.user.id !== client.userID){
    
                if(parameters.genCfg.debugMode){
                    console.log("########################################")
                    console.log("@GameSection - event.data:", event.data)
                    console.log("########################################")
                }
                
                if(!stateIsUpdated){ 
                    // Update state to inform user that the opponent is waiting
                    setOpponentStates((prevStates) => ({
                        ...prevStates,
                        ready2Play: event.data.ready2Play,
                        pausedGame: event.data.isPaused,
                        exitConfirmed: event.data.exitConfirmed,
                    }))
                
                    setStateIsUpdated(true);
                }
            }
        })

    }catch(error){ 
        // Error handling: Navigate the player back to the home section
        console.error(error.message);
    }

    /**
     * Function to be executed when the "Start Game" button is clicked.
     * If the game is not paused, sets the 'ready2Play' parameter to true and disables the button.
     * @function
     */
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

        setStateIsUpdated(false);
    }
    /**
     * Function to be executed when the "Pause/Proceed Game" button is clicked.
     * If the game is not paused, it pauses the game and changes the button text to "Proceed Game".
     * If the game is paused, it proceeds the game and changes the button text to "Pause Game".
     * @function
     */
    function pauseGame(){
        if(!gameStates.isPaused){
            // After pausing the game, change the button text of 'Pause Game' to 'Proceed Game'
            setButtonStates((prevStates) => ({
                ...prevStates,
                pauseButtonText: "Proceed Game",
            }));
            
            // TO-DO: Pause the timer of the game after triggering the event
            // In Progress...

            // Set ready2Play = false
            setGameStates((prevStates) => ({
                ...prevStates,
                ready2Play: false,
                isPaused: true,              
            })); 
            
            setStateIsUpdated(false);
        }
        else{
            // After proceeding the game, change the button text of 'Proceed Game' to 'Pause Game'
            setButtonStates((prevStates) => ({
                ...prevStates,
                pauseButtonText: "Pause Game",
            }));            

            // TO-DO: Activate the timer (without resetting) to proceed
            // In Progress...

            if(buttonStates.counterUsedStartButton === 0){
                // Set isPaused: false to proceed
                setGameStates((prevStates) => ({
                    ...prevStates,
                    isPaused: false, 
                })); 
            }
            else{
                // Set ready2Play = true and isPaused: false to proceed, when start button was used once
                setGameStates((prevStates) => ({
                    ...prevStates,
                    ready2Play: true,
                    isPaused: false, 
                })); 
            } 
        }
    }

    /**
     * Function to be executed when the "Exit Game" button is clicked.
     * Sets the 'ready2Play' parameter to false and triggers the exit from the game.
     * @function
     */
    function exitGame(){
        // Set ready2Play = false to exit game
        setGameStates((prevStates) => ({
            ...prevStates,
            ready2Play: false,
            leaveGame: true,       
        })); 

        setStateIsUpdated(false)
    }

    /**
     * Effect hook to change the functionality of the Start Button after starting the game.
     * @function
     */
    useEffect(() => {

        const disableStartButton = () => {
            if (buttonStates.counterUsedStartButton > 0) {
                setButtonStates((prevStates) => ({
                    ...prevStates,
                    disabledStartButton: true,
                }));
            }
        }; 
        
        if(!buttonStates.disabledStartButton){
            disableStartButton()
        }

    }, [buttonStates.counterUsedStartButton, buttonStates.disabledStartButton])


    if(parameters.genCfg.debugMode){
        console.log("######################################################")
        console.log("@GameSection - gameStates: ", gameStates)
        console.log("@GameSection - buttonStates: ", buttonStates)
        console.log("@GameSection - stateIsUpdated: ", stateIsUpdated) 
        console.log("@GameSection - opponentStates: ", opponentStates)
        console.log("######################################################")
    }
    
    return(
        <div className="ui-container" >
        {(!gameStates.ready2Play || !opponentStates.ready2Play) && (<Cover className={(gameStates.ready2Play && opponentStates.ready2Play) ? '' : 'Cover-FadeOut'}/>)}
            <div className="btn-container" style = {parameters.styleButtonContainer}>
                <button type="button" 
                        id={!buttonStates.disabledStartButton ? "highlighted-button": ''}
                        className = "btn btn-warning"
                        style={parameters.styleButtonText}
                        onClick={startGame} 
                        disabled = {buttonStates.disabledStartButton} >
                    {buttonStates.startButtonText}
                </button> 
                <button type="button" 
                        className="btn btn-warning" 
                        style={parameters.styleButtonText} 
                        onClick={pauseGame}
                        disabled = {gameStates.leaveGame || opponentStates.pausedGame || opponentStates.exitConfirmed ? true : false}>
                    {buttonStates.pauseButtonText}
                </button>  
                <button type="button" 
                        className="btn btn-warning" 
                        style={parameters.styleButtonText} 
                        onClick={exitGame}>
                    {buttonStates.exitButtonText}
                </button>                                                            
            </div>
            <ScoutStatesProvider> 
                <GameField /> 
            </ScoutStatesProvider> 

             {/* TO-DO: CHAT-Component */}

             {/* <ToastContainer position='top-right' /> */}
        </div>         
    )
};
export default GameSection