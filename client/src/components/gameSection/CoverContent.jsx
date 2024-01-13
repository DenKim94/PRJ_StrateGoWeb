import React, {useState, useEffect} from 'react';
import { useGameStates } from '../context/GameStatesContext.js';
import * as parameters from '../../game-logic/parameters.js';

const CoverContent  = ({ coverContentProps = parameters.coverContent}) => {

    const defaultCoverContent = coverContentProps.messageBeforeStart ;
    const [coverContent, setCoverContent] = useState(defaultCoverContent)
    const { gameStates } = useGameStates();

    // Update content/message of the cover depending on the game state 
    useEffect(() => {
      const updateCoverContent = () => {
          if(gameStates.isPaused) {
            setCoverContent(coverContentProps.messageWhilePause)
          }
          else if(gameStates.leaveGame){
            setCoverContent(coverContentProps.messageAtExit)
          }
          else if(!gameStates.isPaused && !gameStates.ready2Play){
            setCoverContent(defaultCoverContent)
          }
          else return
      }; 
  
      updateCoverContent()
      }, [gameStates.ready2Play,
          gameStates.isPaused,
          gameStates.leaveGame,
          defaultCoverContent,
          coverContentProps.messageAtExit, 
          coverContentProps.messageWhilePause]) 

    return (
        <div style = {coverContentProps.styleCoverContent}>
            {coverContent}
        </div>
    )
};

export default CoverContent

