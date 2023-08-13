import React from 'react';
import './App.css';
import GameField from './components/GameField';
import * as cfg from './components/parameters';
import GameLogo from './components/GameLogo';  

/* ******************************************************************* */ 
const App = () => {
    return(
        <div id = "app"> 
            <GameLogo/>
            <GameField 
                fieldWidth = {cfg.gameFieldStruct.fieldWidth} 
                fieldHeight = {cfg.gameFieldStruct.fieldHeight} 
                backgroundColor = {cfg.gameFieldStruct.backgroundColor}
                coordsNonPlayableFields = {cfg.gameFieldStruct.coordsNonPlayableFields}
                colorNonPlayableFields = {cfg.gameFieldStruct.colorNonPlayableFields}
            />
        </div>       
    )
};
 
export default App;