import React from "react";
import * as parameters from '../../game-logic/parameters.js';

/**
 * React component rendered after the user leaves the game.
 * @component
 * @param {Object} exitSectionProps - Additional exit section properties (default to parameters.exitSectionProps).
 * @param {Object} exitSectionProps.style - Custom styles for the component.
 * @returns {JSX.Element} - React JSX element representing the ExitSection component.
 */
const ExitSection = ({exitSectionProps = parameters.exitSectionProps}) => {

    // TO-DO: Delete all saved cookies [11.02.2024]

    return(
        <div style={exitSectionProps.style}>
            {exitSectionProps.message}
        </div>
    )
};

export default ExitSection