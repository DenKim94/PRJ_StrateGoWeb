import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../gameSection/Button.jsx'
import axios from 'axios';
import Cookies from 'universal-cookie'
import DropDownButton from './DropDownButton.jsx'
import * as parameters from '../../game-logic/parameters.js';
import { useGameStates } from '../context/GameStatesContext.js';

const SetUp = ({ setToken,
                 userCreated, 
                 setUserCreated, 
                 setUpProps = parameters.setUpProps}) => {

    const cookies = useMemo(() => new Cookies(), []);
    const { gameStates, setGameStates } = useGameStates();
    const [opponentName, setOpponentName] = useState("");
    // const navigate = useNavigate();
    const SETUPURL = process.env.REACT_APP_SETUP_URL;
    
    useEffect(() => {

        const setUserProps = () => {
            // Get data from backend server
            axios.post(SETUPURL, {gameStates}).then((res) => {
    
                const {userProps, token} = res.data; 
                console.log(">> res.data: ", res.data )

                // Setting coockies
                cookies.set("token", token);
                cookies.set("userID", userProps.userID);
                cookies.set("playerName", userProps.playerName);
                cookies.set("playerNumber", userProps.playerNumber);

                setToken(token)
            });
            
            setUserCreated(true)
        }

        if(!userCreated){
            setUserProps()
        }

    },[gameStates, userCreated, setUserCreated, SETUPURL, cookies, setToken])

    const handleChangedName = (event) => {
        const inputValue = event.target.value
        setOpponentName(inputValue.trim())      // Update the state with opponent name
    };

    const startGame = () => {
        console.log(">> Start Game in progress...")
    }

    const joinGame = () => {
        console.log(">> Join Game in progress...")
    }

    if(parameters.genCfg.debugMode){
        console.log("> cookies_SetUp:", cookies)
        console.log("> gameStates_SetUp:", gameStates)
        console.log("> userCreated_SetUp:", userCreated)
    }

    return (
        <div style={setUpProps.style}>
            <p style={{ fontSize: '15px', 
                        color: 'rgb(248, 202, 45)', 
                        textAlign: 'center',
                        marginBottom: "20px"}}>

                Welcome {gameStates.playerName}! 
                <br/> {gameStates.isPlayer1 ? (setUpProps.messages.player1) : (setUpProps.messages.player2)}
            </p>
            <div className='game-settings' style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <input style = {setUpProps.inputStyle} 
                    type='string' 
                    placeholder = "Name of opponent" 
                    value={opponentName}
                    onChange = {handleChangedName} />

                {gameStates.isPlayer1 ? (
                 <>
                  <DropDownButton />  
                  <Button buttonName = {"Start Game"} isDisabled = {opponentName.length > 0 ? false : true} onCklickFunction = {startGame}/>                 
                 </>   
                ) : 
                <Button buttonName = {"Join Game"} isDisabled = {opponentName.length > 0 ? false : true} onCklickFunction = {joinGame}/> } 
            </div>
                      
        </div> 
    );
}
 
export default SetUp;
