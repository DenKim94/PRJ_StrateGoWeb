import React from 'react';
import './App.css';
import * as parameters from './game-logic/parameters';
import GameField from './components/GameField';
import GameLogo from './components/GameLogo';  
import Button from './components/Button';

/* ******************************************************************* */ 
/**** Add user inputs ****/
let userSettings = {
    colorPlayer: 'blue',  // player color as placeholder [string] 
    ready2Play: true,    // state as placeholder [boolean]
};
/*** Functions after click the buttons ****/
function startGame(){
    console.log(">> Start Game: In Progress...")
}
function pauseGame(){
    console.log(">> Pause Game: In Progress...")
}
function exitGame(){
    console.log(">> Exit Game: In Progress...")
}

const App = () => {
         
    /*** Rendering the components ***/  
    return(
        <div className = "App"> 
            <GameLogo/> 
            <div className="ui-container">
                <div className="btn-container">
                    <Button buttonName={'Start Game'} onCklickFunction={startGame}/> 
                    <Button buttonName={'Pause Game'} onCklickFunction={pauseGame}/> 
                    <Button buttonName={'Exit Game'} onCklickFunction={exitGame}/>
                </div>
                <GameField gameFieldSettings = {parameters.gameFieldObj} gameSettings = {userSettings}/> 
            </div>
        </div>       
    )
};
 
export default App;