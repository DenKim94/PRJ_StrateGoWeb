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
/*** Functions after click a button ****/
function startGame(){
    console.log(">> Start Game: In Progress...")
}

const App = () => {
         
    /*** Rendering the components ***/  
    return(
        <div className = "App"> 
            <GameLogo/> 
            <Button buttonName={'Start Game'} onCklickFunction={startGame}/> 
            <GameField gameFieldSettings = {parameters.gameFieldObj} gameSettings = {userSettings}/> 
        </div>       
    )
};
 
export default App;