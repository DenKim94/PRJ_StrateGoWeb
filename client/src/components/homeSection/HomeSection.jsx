import React from "react";
import { useButtonStates } from '../context/ButtonStatesContext.js';
import { useGameStates } from '../context/GameStatesContext.js';
import * as parameters from '../../game-logic/parameters.js';
/**
 * - This Component provides user settings to the backend 
 * - The user is going to check into the game
 * 
 * @param {Object} homeSectionProps - Object contains configuration parameters of the component 
 * 
 */

const HomeSection = ({ homeSectionProps = parameters.homeSectionProps }) => {

const { buttonStates } = useButtonStates();
const { gameStates } = useGameStates();

    return(
        <div style={homeSectionProps.style}>
            {homeSectionProps.message}
        </div>
    )
};

export default HomeSection