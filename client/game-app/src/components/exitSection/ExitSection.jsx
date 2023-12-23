import React from "react";
import * as parameters from '../../game-logic/parameters.js';
/** 
 * - This Component will be rendered after the user is leaved the game
 * - Saved cookies are going to be deleted [TO-DO: 23.12.2023]
*/
const ExitSection = ({exitSectionProps = parameters.exitSectionProps}) => {

    return(
        <div style={exitSectionProps.style}>
            {exitSectionProps.message}
        </div>
    )
};

export default ExitSection