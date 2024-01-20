import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie'
import * as parameters from '../../game-logic/parameters.js';
import { useGameStates } from '../context/GameStatesContext.js';

const SetUp = ({ setUserCreated, setUpProps = parameters.setUpProps}) => {

    const cookies = useMemo(() => new Cookies(), []);
    const { gameStates, setGameStates } = useGameStates();
    const navigate = useNavigate();
    const SETUPURL = process.env.REACT_APP_SETUP_URL;
    
    useEffect(() => {

        const userCheckIn = () => {

            axios.post(SETUPURL, {gameStates}).then((res) => {
    
                const {userProps, token} = res.data; 
                console.log(">> res.data: ", res.data )
    
                cookies.set("token", token);
                cookies.set("userID", userProps.userID);
                cookies.set("playerName", userProps.playerName);
                cookies.set("playerNumber", userProps.playerNumber);
    
            });
        }

        if('playerNumber' in gameStates){
            userCheckIn()
            setUserCreated(true)
        }

    },[gameStates, setUserCreated, SETUPURL, cookies])


    return (
        <div style={setUpProps.style}>
            <p style={{ fontSize: '15px', 
                        color: 'rgb(248, 202, 45)', 
                        textAlign: 'center',
                        marginBottom: "20px"}}>

                Welcome {gameStates.playerName}! <br/> Please enter the game settings.
            </p>
        </div> 
    );
}
 
export default SetUp;
