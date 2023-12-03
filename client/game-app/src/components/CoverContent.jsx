import React, {useState, useEffect} from 'react';
import * as parameters from '../game-logic/parameters.js';

const CoverContent  = ({gameStates, coverContentProps = parameters.coverContent}) => {

    const defaultCoverContent = coverContentProps.messageBeforeStart ;
    const [coverContent, setCoverContent] = useState(defaultCoverContent)
    
    // Update content/message of the cover depending on the game state 
    useEffect(() => {
      const updateCoverContent = () => {
          if(gameStates.isPaused) {
            setCoverContent(coverContentProps.messageWhilePause)
          }
          else if(gameStates.leavedGame){
            setCoverContent(coverContentProps.messageAtExit)
          }
          else if(!gameStates.isPaused && !gameStates.ready2Play){
            console.log(">> here: ")
            setCoverContent(defaultCoverContent)
          }
          else return
      }; 
  
      updateCoverContent()
      }, [gameStates.ready2Play,
          gameStates.isPaused,
          gameStates.leavedGame,
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

