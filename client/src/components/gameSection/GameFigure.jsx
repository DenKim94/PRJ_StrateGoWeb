import React from "react";
import * as parameters from '../../game-logic/parameters.js';

/**
 * React component representing a game figure.
 * 
 * @component
 * @param {Object} props - The component's properties.
 * @param {Object} props.propsObj - Object containing properties of the game figure.
 * @param {Object} props.snapshot - The snapshot object provided by the React DnD library.
 * @param {Object} props.figureStyle - Custom style for the game figure container.
 * @param {Object} props.valueStyle - Custom style for the value displayed on the game figure.
 * @returns {JSX.Element|null} Returns the JSX element representing the game figure or null if propsObj is empty.
 */

const GameFigure = ({propsObj, snapshot, figureStyle = parameters.styleGameFigure, valueStyle = parameters.valueStyleGameFigure}) => {
    
    /* If 'propsObj' is empty, the component is not goint to be rendered */
    if(!propsObj){
      return null;
    }
    /* Extract figure properties for each ID  */
    const { imgPath, value, figName } = propsObj;
    
    // Checking values of parameters in 'debugMode' 
    if(parameters.genCfg.debugMode){
      console.log('###### GameFigure ######');
      console.log('>> propsObj: ', propsObj);
      console.log('>> imgPath: ', imgPath);
    }

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