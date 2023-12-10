import React from "react";
import * as parameters from '../../game-logic/parameters.js';
import GameField from './GameField';  
import Cover from './Cover';
import './Buttons.css'

const GameSection = ({gameStates, setGameStates, 
                    buttonStates, setButtonStates,
                    startGame, pauseGame, exitGame}) => {

    return(
        <div className="ui-container" >
        {!gameStates.ready2Play && (<Cover GameStates={gameStates} updateGameStates = {setGameStates} 
                                    ButtonStates = {buttonStates}
                                    className={gameStates.ready2Play ? '' : 'Cover-FadeOut'} />)}
            <div className="btn-container" style = {parameters.styleButtonContainer}>
                <button type="button" 
                        id={!buttonStates.disabledStartButton ? "highlighted-button": ''}
                        className = "btn btn-warning"
                        style={parameters.styleButtonText}
                        onClick={startGame} 
                        disabled = {gameStates.leaveGame ? true : buttonStates.disabledStartButton} >
                    {buttonStates.startButtonText}
                </button> 
                <button type="button" 
                        className="btn btn-warning" 
                        style={parameters.styleButtonText} 
                        onClick={pauseGame}
                        disabled = {gameStates.leaveGame ? true : false}>
                    {buttonStates.pauseButtonText}
                </button>  
                <button type="button" 
                        className="btn btn-warning" 
                        style={parameters.styleButtonText} 
                        onClick={exitGame}>
                    {buttonStates.exitButtonText}
                </button>                                                            
            </div>
            <GameField gameFieldSettings = {parameters.gameFieldObj} 
                    gameSettings = {gameStates} 
                    buttonStates = {buttonStates}
                    setStartButtonState = {setButtonStates} /> 
        </div>         
    )
};
export default GameSection