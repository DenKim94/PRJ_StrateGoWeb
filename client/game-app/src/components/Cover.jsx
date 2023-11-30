import React, {useState} from 'react';
import './Cover.css'

const Cover = ({ GameStates }) => {
    // Predefined style of the cover component
    const defaultCoverContent = "Placeholder: Set up you game figures and get ready for the battle!" ;
    const coverStyle = {
      position: 'absolute',
      fontFamily: 'Young Serif, serif',
      top: '0px',
      left: '80px',
      width: '700px',
      height: '405px',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '5px',  
      backgroundColor: 'rgba(0, 0, 0, 0.9)',  
      zIndex: 2,  // Second layer to cover the GameField-Component
      transition: 'opacity 0.5s ease-out',  // Transition presets
      opacity: GameStates.ready2Play ? 0 : 1,  // Opacity of the component depending on the state of 'isReady2Play'
    };
    const [coverContent, setCoverContent] = useState(defaultCoverContent )
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