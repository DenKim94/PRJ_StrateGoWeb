import React from "react";
import { pageNotFoundProps } from '../game-logic/parameters.js';

const PageNotFound = (({props = pageNotFoundProps}) => {

    return ( 
        <div style={props.style}>
            {props.message}
        </div>
     );
})

export default PageNotFound;