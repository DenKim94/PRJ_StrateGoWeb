import React, {useEffect} from 'react';
import * as parameters from '../../game-logic/parameters.js';
import CoverContent from './CoverContent.jsx'
import { useButtonStates } from '../context/ButtonStatesContext.js';
import { useGameStates } from '../context/GameStatesContext.js';
import { useOpponentStates } from '../context/OpponentStatesContext.js';
import './Cover.css'
import ExitBox from './ExitBox.jsx';
/**
 * This Component informs the user about changed game states
 * @param {Object} styleCover - Object contains specific style parameters of the component (see 'parameters.js')
 */
const Cover = ({ styleCover = parameters.styleCover }) => {
  
const { buttonStates } = useButtonStates();
const { gameStates, setGameStates } = useGameStates();

const { opponentStates } = useOpponentStates();

  useEffect(() => {
    const updateCoverState = () => {
        if(gameStates.exitCanceled) {
          setGameStates((prevStates) => ({
            ...prevStates,
            exitConfirmed: false,
            exitCanceled: false,
            leaveGame: false,
        }));          
          if(buttonStates.counterUsedStartButton > 0){
            setGameStates((prevStates) => ({
                ...prevStates,
                ready2Play: !gameStates.isPaused,
            }));         
          }
        }
    }; 

    updateCoverState()
    }, [gameStates.exitCanceled, gameStates.isPaused, setGameStates, buttonStates.counterUsedStartButton]) 

    // Predefined style of the cover component
    const coverStyle = {
      ...styleCover,
      opacity: (gameStates.ready2Play && opponentStates.ready2Play) ? 0 : 1,  // Opacity of the component depending on the state of 'isReady2Play'
    };

    return( 
        <div style = {coverStyle}>
          {/* Use an additional component to render and style the cover content  */}
              <CoverContent/>
              {gameStates.leaveGame && !gameStates.exitCanceled && !gameStates.exitConfirmed && 
              (<ExitBox />)}
        </div>
    
    );
  };
  
  export default Cover;