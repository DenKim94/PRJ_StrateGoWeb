import React from "react";
import * as parameters from '../../game-logic/parameters.js';
/**
 * - This Component provides user settings to the backend 
 * - The user is going to check into the game
 * 
 * @param {Object} GameStates - Object contains relevant states for the game (e.g. ready2Play) 
 * @param {Object} homeSectionProps - Object contains configuration parameters of the component 
 * 
 */
const HomeSection = ({GameStates, setGameStates, 
                     homeSectionProps = parameters.homeSectionProps}) => {

// TO-DO: Auslagern der Inputparameter über 'useContext' [23.12.2023]

    return(
        <div style={homeSectionProps.style}>
            {homeSectionProps.message}
        </div>
    )
};

export default HomeSection