import React from 'react';
import './Cover.css'

const Cover = ({ isReady2Play }) => {
    // Predefined style of the cover component
    const coverStyle = {
      position: 'absolute',
      top: '0px',
      left: '80px',
      width: '700px',
      height: '405px',
      alignItems: 'center',
      justifyContent: 'center',  
      backgroundColor: 'rgba(0, 0, 0, 0.9)',  
      zIndex: 2,  // Second layer to cover the GameField-Component
      transition: 'opacity 0.5s ease-out',  // Transition presets
      opacity: isReady2Play ? 0 : 1,  // Opacity of the component depending on the state of 'isReady2Play'
    };
  
    return <div style={coverStyle}></div>;
  };
  
  export default Cover;