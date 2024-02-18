import React, {useState, useEffect} from 'react';
import { useGameStates } from '../context/GameStatesContext.js';
import { useOpponentStates } from '../context/OpponentStatesContext.js';
import * as parameters from '../../game-logic/parameters.js';

const CoverContent  = ({ coverContentProps = parameters.coverContent }) => {

    const defaultCoverContent = coverContentProps.messageBeforeStart ;
    const [coverContent, setCoverContent] = useState([defaultCoverContent]);
    const { opponentStates } = useOpponentStates();
    const { gameStates } = useGameStates();

    // Update content/message of the cover depending on the game state 
    useEffect(() => {
      const updateCoverContent = () => {
          if(gameStates.isPaused && !opponentStates.pausedGame && !opponentStates.exitConfirmed) {
            setCoverContent([coverContentProps.messageWhilePause])
          }
          else if(opponentStates.pausedGame){
            setCoverContent([`* ${gameStates.opponentName} paused the game. *`])
          }
          else if(gameStates.leaveGame){
            setCoverContent([coverContentProps.messageAtExit])
          }
          else if(!gameStates.isPaused && !gameStates.ready2Play && !opponentStates.ready2Play){
            setCoverContent([defaultCoverContent])
          }
          else if(!gameStates.ready2Play && opponentStates.ready2Play){
            setCoverContent([`* ${gameStates.opponentName} is waiting for you. *`])
          }
          else if(gameStates.ready2Play && !opponentStates.ready2Play){
            setCoverContent([`* Waiting for ${gameStates.opponentName} ... *`])
          }          
          else if(opponentStates.exitConfirmed && !gameStates.exitConfirmed){
            setCoverContent(["*** Congratulations you won! ***", `* ${gameStates.opponentName} left the game *`])
          }
          else return
      }; 
      
      updateCoverContent()

      }, [gameStates.ready2Play,
          gameStates.opponentName,
          gameStates.isPaused,
          gameStates.leaveGame,
          gameStates.exitConfirmed,
          defaultCoverContent,
          opponentStates.pausedGame,
          opponentStates.ready2Play,
          opponentStates.exitConfirmed,
          coverContentProps.messageAtExit, 
          coverContentProps.messageWhilePause]) 

    return (
      <div style = {{ ...coverContentProps.styleCoverContent, whiteSpace: 'pre-line' }}>
        {coverContent.join('\n')}
      </div>
    )
};

export default CoverContent

