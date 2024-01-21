import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie'
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
                // console.log(">> res.data: ", res.data )

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
        setOpponentName(inputValue.trim())
    };

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

                Welcome {gameStates.playerName}! <br/> Please enter the game settings to create a new game.
            </p>
            <input type='string' placeholder = "Name of opponent" onChange = {handleChangedName} />   
        </div> 
    );
}
 
export default SetUp;
