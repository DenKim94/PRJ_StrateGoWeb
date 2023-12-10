import React, {useEffect} from 'react';
import * as parameters from '../../game-logic/parameters.js';
import CoverContent from './CoverContent.jsx'
import './Cover.css'
import ExitBox from './ExitBox.jsx';

const Cover = ({ GameStates, updateGameStates, ButtonStates, styleCover = parameters.styleCover }) => {

  useEffect(() => {
    const updateCoverState = () => {
        if(GameStates.exitCanceled) {
          updateGameStates((prevStates) => ({
            ...prevStates,
            exitConfirmed: false,
            exitCanceled: false,
            leaveGame: false,
        }));          
          if(ButtonStates.counterUsedStartButton > 0){
            updateGameStates((prevStates) => ({
                ...prevStates,
                ready2Play: true,
            }));
          }
        }
    }; 

    updateCoverState()
    }, [GameStates.exitCanceled, updateGameStates, ButtonStates]) 

    // Predefined style of the cover component
    const coverStyle = {
      ...styleCover,
      opacity: GameStates.ready2Play ? 0 : 1,  // Opacity of the component depending on the state of 'isReady2Play'
    };

    return( 
        <div style = {coverStyle}>
          {/* Use an additional component to render and style the cover content  */}
              <CoverContent gameStates = {GameStates} />
              {GameStates.leaveGame && !GameStates.exitCanceled && !GameStates.exitConfirmed && 
              (<ExitBox gameStates = {GameStates} 
                        updateGameStates = {updateGameStates}/>)}
        </div>
    
    );
  };
  
  export default Cover;