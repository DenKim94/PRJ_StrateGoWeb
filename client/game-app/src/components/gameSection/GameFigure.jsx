import React from "react";
import * as parameters from '../../game-logic/parameters.js';

/* *********************** Game Figure Component ************************ */ 

const GameFigure = ({propsObj, snapshot, figureStyle = parameters.styleGameFigure, valueStyle = parameters.valueStyleGameFigure}) => {
    
    /* If 'propsObj' is empty, the component is not goint to be rendered */
    if(!propsObj){
      return null;
    }
    /* Extract figure properties for each ID  */
    const { imgPath, value, figName } = propsObj;
    
    const imgStyle = {
      width: '100%', 
      height: '100%', 
      borderRadius: '10%',
      border: snapshot.isDragging ? '2px solid yellow' : 'none' ,
    };
    
   /* Return to render the component */
    return (
      <div style={figureStyle}>
        <img
          src={imgPath[0]}
          alt={"Name of the game figure: " + figName}
          style={imgStyle}
        />

        {(figName !== 'Bomb.png') && (figName !== 'Flag.png') && (figName !== 'FigureBack.png') && (
          <span style={valueStyle}>{value}</span>
        )}
    </div>
    );   
};

export default GameFigure;