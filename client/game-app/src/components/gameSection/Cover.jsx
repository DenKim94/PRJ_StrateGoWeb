import React from 'react';
import * as parameters from '../../game-logic/parameters.js';
import CoverContent from './CoverContent.jsx'
import './Cover.css'
import ExitBox from './ExitBox.jsx';

const Cover = ({ GameStates, updateGameStates, styleCover = parameters.styleCover }) => {
    
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
              <CoverContent gameStates = {GameStates} />
              {GameStates.leaveGame && 
              !GameStates.exitConfirmed && 
              (<ExitBox gameStates = {GameStates} 
                        updateGameStates = {updateGameStates}/>)}
        </div>
    
    );
  };
  
  export default Cover;