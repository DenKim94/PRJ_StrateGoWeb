import React from "react";
import * as parameters from '../../game-logic/parameters.js';

const ExitSection = ({exitSectionProps = parameters.exitSectionProps}) => {

    return(
        <div style={exitSectionProps.style}>
            {exitSectionProps.message}
        </div>
    )
};

export default ExitSection