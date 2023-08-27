import React from "react";
import { useDrag } from 'react-dnd';
import { figProperties } from './parameters'; 
import { genCfg } from './parameters'; 

/* *********************** Game Figure Component ************************ */ 
const GameFigure = ({ id, playerColor, isActive}) => {
    /* Extract figure properties for each ID  */
    const { image, value, size , figName} = figProperties[id];
    /* Define the component as draggable */
    const [{ isDragging }, drag] = useDrag({
        type: 'FIGURE',
        item: { id },
        collect: monitor => ({
          isDragging: monitor.isDragging(),
        }),
      });
      
    /* Set style of the component */
    const figureStyle = {
      backgroundImage: isActive ? `url(${image[0]})`: `url(${image[1]})`,
      backgroundColor: isActive ? playerColor : 'gray',
      width: `${size[0]}px`, 
      height: `${size[1]}px`, 
      borderRadius: '30%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
    };

    const valueStyle = {
      fontSize: '7px', // Passen Sie die Schriftgröße an
    };

    /* Checking parameters in 'debugMode' */
    if(genCfg.debugMode){
      console.log("################### Component: GameFigure #####################");
      console.log(">> ID: ", id); 
      console.log(">> figureProperties[ID]: ", figureProperties[id]);     
      console.log(" #############################################################");
    }

    /* Return to render the component */
    return (
      <div
        ref={drag}
        className={`figure ${isDragging ? 'dragging' : ''}`}
        style={figureStyle}
      >
        <span style={valueStyle}>{value}</span>
      </div>
    );   
};

export default GameFigure;