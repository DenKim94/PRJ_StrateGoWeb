import React from 'react';
import * as parameters from '../game-logic/parameters.js';
import CoverContent from './CoverContent.jsx'
import './Cover.css'

const Cover = ({ GameStates, styleCover = parameters.styleCover, coverContentProps = parameters.coverContent}) => {
    
    // Predefined style of the cover component
    const coverStyle = {
      ...styleCover,
      opacity: GameStates.ready2Play ? 0 : 1,  // Opacity of the component depending on the state of 'isReady2Play'
    };

    // Leave the function after starting the game --> component will not be rendered except of pausing
    if(GameStates.ready2Play){
      return;
    }
 
    return( 
        <div style = {coverStyle}>
          {/* Use an additional component to render and style the cover content  */}
              <CoverContent gameStates = {GameStates}/>
        </div>
    
    );
  };
  
  export default Cover;