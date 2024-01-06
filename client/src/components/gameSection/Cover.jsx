import React, {useEffect} from 'react';
import * as parameters from '../../game-logic/parameters.js';
import CoverContent from './CoverContent.jsx'
import './Cover.css'
import ExitBox from './ExitBox.jsx';
/**
 * This Component informs the user about changed game states
 * @param {Object} styleCover - Object contains specific style parameters of the component (see 'parameters.js')
 */
const Cover = ({ GameStates, updateGameStates, ButtonStates, styleCover = parameters.styleCover }) => {
  
// TO-DO: Auslagern der Inputparameter über 'useContext' [23.12.2023]

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
                ready2Play: !GameStates.isPaused,
            }));         
          }
        }
    }; 

    updateCoverState()
    }, [GameStates.exitCanceled, GameStates.isPaused, updateGameStates, ButtonStates]) 

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