import React from "react";
import { genCfg } from './parameters'; 

/* *********************** Game Figure Component ************************ */ 
const GameFigure = ({propsObj}) => {
    /* Extract figure properties for each ID  */
    const { imgPath, value, size , figName } = propsObj;
      
    /* Set style of the component */
    const figureStyle = {
      backgroundImage: `url(${imgPath[0]})`,
      width: `${size[0]}px`, 
      height: `${size[1]}px`, 
      borderRadius: '10%',
      display: 'flex',
      alignItems: 'flex-start', 
      justifyContent: 'flex-start', 
      backgroundSize: 'cover',
      cursor: 'grab',
    };

    const valueStyle = {
      fontSize: '12px', // Passen Sie die Schriftgröße an
      position: 'absolute',
      color: 'white',
      backgroundColor: 'black',
      padding: '1px 2px',
      borderRadius: '3px',   
    };

    /* Checking parameters in 'debugMode' */
    if(genCfg.debugMode){
      console.log("################### Component: GameFigure #####################");
      console.log(">> figProperties: ", propsObj);     
      console.log(" #############################################################");
    }

    /* Return to render the component */
    return (
      <img
        src = {imgPath} 
        alt={"Name of the game figure: "+figName}
        style={figureStyle}> 
  
        {(figName !== 'Bomb.png') && (figName !== 'Flag.png') && (figName !== 'FigureBack.png') && 
        (
          <span style={valueStyle}>{value}</span>
        )}

      </img>
    );   
};

export default GameFigure;