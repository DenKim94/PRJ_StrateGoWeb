import React from "react";
import * as parameters from '../../game-logic/parameters.js';

const HomeSection = ({GameStates, setGameStates, 
                     homeSectionProps = parameters.homeSectionProps}) => {

    return(
        <div style={homeSectionProps.style}>
            {homeSectionProps.message}
        </div>
    )
};

export default HomeSection