import React, {useState} from 'react';
import * as parameters from '../game-logic/parameters.js';
import './Cover.css'

const Cover = ({ GameStates, styleCover = parameters.styleCover }) => {
    
    const defaultCoverContent = "Placeholder: Set up you game figures and get ready for the battle!" ;
    // Predefined style of the cover component
    const coverStyle = {
      ...styleCover,
      opacity: GameStates.ready2Play ? 0 : 1,  // Opacity of the component depending on the state of 'isReady2Play'
    };
    const [coverContent, setCoverContent] = useState(defaultCoverContent)

    // Leave the function after starting the game --> component will not be rendered anymore
    if(GameStates.ready2Play){
      return;
    }

    /* To-Do: 30.11.2023
        1) Use an additional component to render and style the cover content 
        2) Update content/message of the cover text depending of the game states */
  
    return( 
        <div style={coverStyle}>
              {coverContent}
        </div>
    
    );
  };
  
  export default Cover;