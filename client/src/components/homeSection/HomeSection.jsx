import React, { useState, useEffect } from 'react';
import { useGameStates } from '../context/GameStatesContext.js';
import { useNavigate } from 'react-router-dom';
import * as parameters from '../../game-logic/parameters.js';
import Button from '../gameSection/Button.jsx'
import '../gameSection/Buttons.css'
/**
 * - This Component provides user settings to the backend 
 * - The user is going to check into the game
 * 
 * @param {Object} homeSectionProps - Object contains configuration parameters of the component 
 * 
 */

const HomeSection = ({ homeSectionProps = parameters.homeSectionProps }) => {

    const [isInfoVisible, setInfoVisible] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();
    const { gameStates, setGameStates } = useGameStates();
    const pathToNextPage = "/setUp";

    // Ensure a valid input length of user name  
    useEffect(() => {
        const ensureValidInputLength = () => {
            const userName = gameStates.playerName; 
            if(userName){
                if(userName.length < homeSectionProps.minInputLength || userName.length > homeSectionProps.maxInputLength){
                    setInfoVisible(true)
                    setIsValid(false)
                }
                else{
                    setInfoVisible(false) 
                    setIsValid(true)
                }
            }
        };

        ensureValidInputLength()
        
    }, [gameStates, homeSectionProps]);

    
    // Handle user input
    const handleChangedPlayerName = (event) => {
        const inputValue = event.target.value
        setGameStates((prevStates) => ({
            ...prevStates,
            playerName: inputValue.trim(),
        })) 
               
    };

    const createNewGame = () => {
        setGameStates((prevStates) => ({
            ...prevStates,
            playerNumber: 1,
            isPlayer1: true,
            isCheckedIn: true,
        })) 
        navigate(pathToNextPage)
    }

    const joinGame = () => {
        console.log(">> Join game")
        setGameStates((prevStates) => ({
            ...prevStates,
            playerNumber: 2,
            isPlayer1: false,
            isCheckedIn: true,
        }))
        navigate(pathToNextPage)
    }

    return(
        <div style={homeSectionProps.style}>
            
            <input style = {{border: isInfoVisible ? '2px solid yellow' : '1px solid black', 
                            marginBottom: '10px', 
                            borderRadius: '5px',
                            fontWeight: "lighter",
                            textAlign: 'center'}} 

                   type='string' 
                   placeholder = {homeSectionProps.inputPlaceHolder} 
                   onChange = {handleChangedPlayerName}/>

            {isInfoVisible && (
                <p style={{ fontSize: '15px', color: 'yellow' }}>
                    Please notice that the user name should have more than 1 and less than 20 characters. 
                </p>
            )}    
            <Button buttonName = {"Create New Game"} isDisabled = {isValid ? false : true} onCklickFunction = {createNewGame}/>      
            <Button buttonName = {"Join Game"} isDisabled = {isValid ? false : true} onCklickFunction = {joinGame}/>   
        </div>
    )
};

export default HomeSection