import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie'
import * as parameters from '../../game-logic/parameters.js';
import { useGameStates } from '../context/GameStatesContext.js';

const SetUp = ({setUpProps = parameters.setUpProps}) => {

    const cookies = new Cookies();
    const { gameStates, setGameStates } = useGameStates();
    const navigate = useNavigate();
    
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
