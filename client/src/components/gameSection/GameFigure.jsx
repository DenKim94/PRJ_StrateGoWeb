import React from "react";
import * as parameters from '../../game-logic/parameters.js';
import * as helperFcn from '../functions/helperFunctions.js'
import { useGameStates } from '../context/GameStatesContext.js';

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
    
    const { gameStates } = useGameStates();

    // Get only a color of current player
    const [playerColor] = helperFcn.getColorAndNumberOfCurrentPlayer(gameStates.isPlayer1, gameStates.colorPlayer1, gameStates.colorPlayer2);

    if(!propsObj){
      return null;
    }

    const { imgPath, value, figName, color , isActive} = propsObj;
    
    // Using default border color and image style
    const colorBorder = 'yellow'; 

    const imgStyle = {
      width: '100%', 
      height: '100%', 
      borderRadius: '10%',
      border: snapshot.isDragging ? `2px solid ${colorBorder}` : 'none' ,
    };

    let pathIndex

    if(color !== playerColor && isActive){
        // Hide figures of the opponent by showing the back side
        pathIndex = imgPath.findIndex((path) => path.includes('FigureBack'));

    }else if(color === playerColor && isActive){
        pathIndex = imgPath.findIndex((path) => path.includes(playerColor));

    }else{
        pathIndex = imgPath.findIndex((path) => path.includes('dead'));
    } 

    return (
      <div style={figureStyle}>
        <img
          src={imgPath[pathIndex]}
          alt={"Name of the game figure: " + figName}
          style={imgStyle}
        />

        {(!figName.includes('Bomb.png')) && (!figName.includes('Flag')) && (!imgPath[pathIndex].includes( 'FigureBack')) && (
          <span style={valueStyle}>{value}</span>
        )}
    </div>
    );   
};

export default GameFigure;