import React, {useState, useEffect} from 'react';
import { useGameStates } from '../context/GameStatesContext.js';
import { useOpponentStates } from '../context/OpponentStatesContext.js';
import * as parameters from '../../game-logic/parameters.js';
/**
 * This Component renders the messages depending on game states
 * @param {Object} coverContentProps - Object contains predefinded messages and parameters of the component (see 'parameters.js')
 */
const CoverContent  = ({ coverContentProps = parameters.coverContent }) => {

    const defaultCoverContent = coverContentProps.messageBeforeStart ;
    const [coverContent, setCoverContent] = useState([defaultCoverContent]);
    const { opponentStates } = useOpponentStates();
    const { gameStates } = useGameStates();

    console.log("@CoverContent - gameStates: ", gameStates)
    console.log("@CoverContent - opponentStates: ", opponentStates)

    // Update content/message of the cover depending on the game state 
    useEffect(() => {
      const updateCoverContent = () => {
          if(gameStates.isPaused && !opponentStates.pausedGame && !opponentStates.exitConfirmed) {
            setCoverContent([coverContentProps.messageWhilePause])
          }
          else if(opponentStates.pausedGame){
            setCoverContent([`* ${gameStates.opponentName} paused the game *`])
          }
          else if(gameStates.leaveGame){
            setCoverContent([coverContentProps.messageAtExit])
          }
          else if(!gameStates.isPaused && !gameStates.ready2Play && 
                  !opponentStates.ready2Play && !opponentStates.timeIsOut && 
                  !gameStates.timeIsOut && !gameStates.exitConfirmed && !opponentStates.exitConfirmed && 
                  !gameStates.flagIsFound && !opponentStates.flagIsFound){
            setCoverContent([defaultCoverContent])
          }
          else if(!gameStates.ready2Play && opponentStates.ready2Play && !opponentStates.timeIsOut && !gameStates.timeIsOut && 
            (!opponentStates.flagIsFound && !gameStates.flagIsFound)){
            setCoverContent([`* ${gameStates.opponentName} is waiting for you *`])
          }
          else if(gameStates.ready2Play && !opponentStates.ready2Play && !opponentStates.timeIsOut && !gameStates.timeIsOut && 
            (!opponentStates.flagIsFound && !gameStates.flagIsFound)){
            setCoverContent([`* Waiting for ${gameStates.opponentName} ... *`])
          }          
          else if(opponentStates.exitConfirmed && !gameStates.exitConfirmed){
            setCoverContent([`*** ${gameStates.opponentName} left the game ***`])
          }
          else if(opponentStates.timeIsOut && !gameStates.timeIsOut){
            setCoverContent(["*** Congratulations! You won the game ***", `* Time is over for ${gameStates.opponentName} *`])
          }
          else if(!opponentStates.timeIsOut && gameStates.timeIsOut){
            setCoverContent(["*** Your time has run out! You lost the game ***"])
          }
          else if((!opponentStates.ready2Play) && (opponentStates.flagIsFound) && (!gameStates.battleModeOn)){
            setCoverContent([`*** ! ${gameStates.opponentName} has captured your flag ! ***`, "* You lost the game *"])
          }   
          else if((!gameStates.ready2Play) && (gameStates.flagIsFound) && (!gameStates.battleModeOn)){
            setCoverContent(["*** ! Congratulations ! ***", "* You won the game *"])
          }                   
          else return null
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
          opponentStates.timeIsOut,
          gameStates.timeIsOut,
          coverContentProps.messageAtExit, 
          gameStates.flagIsFound,
          opponentStates.flagIsFound,
          gameStates.battleModeOn,
          coverContentProps.messageWhilePause]) 

    return (
      <div style = {{ ...coverContentProps.styleCoverContent, whiteSpace: 'pre-line' }}>
        {coverContent.length > 0 ? coverContent.join('\n') : null}
      </div>
    )
};

export default CoverContent

