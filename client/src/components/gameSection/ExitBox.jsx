import React, { useState, useEffect }  from 'react';
import { useGameStates } from '../context/GameStatesContext.js';
import * as parameters from '../../game-logic/parameters.js';

/**
 * React component representing an exit confirmation box with options to confirm or cancel.
 * 
 * @component
 * @param {Object} gameStates - Object containing game-related states.
 * @property {boolean} gameStates.exitConfirmed - Indicates whether the exit is confirmed.
 * @property {boolean} gameStates.exitCanceled - Indicates whether the exit is canceled.
 * @param {Function} updateGameStates - Function to update game states.
 * @param {Object} exitBoxProps - Additional properties for styling the exit box.
 * @property {Object} exitBoxProps.styleParamsBox - Style parameters for the exit box container.
 * @property {Object} exitBoxProps.styleParamsMessage - Style parameters for the exit box message.
 * @property {Object} exitBoxProps.styleParamsButtons - Style parameters for the exit box buttons container.
 * @property {string} exitBoxProps.message - Message displayed in the exit box.
 * @returns {JSX.Element} Returns the JSX element representing the exit box.
 */
const ExitBox = ({ exitBoxProps = parameters.exitBoxProps }) => {

    const { gameStates, setGameStates } = useGameStates();
    const [confirmedState, setConfirmedState] = useState(gameStates.exitConfirmed)
    const [canceledState, setCanceledState] = useState(gameStates.exitCanceled)

    // Update game states after using the buttons
    function handleConfirm(){
        setConfirmedState(true)
    }   
    function handleCancel(){
        setCanceledState(true)  
    }

    useEffect(() => {
        const handleExit = () => {
            if(confirmedState) {
                setGameStates((prevStates) => ({
                    ...prevStates,
                    exitConfirmed: true,
                }));                
            }
            
            if(canceledState){
                setGameStates((prevStates) => ({
                    ...prevStates,
                    exitCanceled: true, 
                }));                
            }
        }; 
    
        handleExit()
        }, [canceledState, confirmedState, setGameStates])    

    return(
        <div className="exit-box" style={exitBoxProps.styleParamsBox}>
            <p style={exitBoxProps.styleParamsMessage}>{exitBoxProps.message}</p>
            <div style={exitBoxProps.styleParamsButtons}>
                <button onClick={handleConfirm} style={{borderRadius: '5px'}}> Yes </button>
                <button onClick={handleCancel} style={{borderRadius: '5px'}}> No </button>
            </div>
      </div>        
    )
};
export default ExitBox