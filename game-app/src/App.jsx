import React from 'react';
import './App.css';
import GameField from './components/GameField';
import * as cfg from './components/parameters';  // Import externer Config-Parameter

const App = () => {
    return(
        <div id = "app"> 
            <GameField 
                fieldWidth = {cfg.gameFieldStruct.fieldWidth} 
                fieldHeight = {cfg.gameFieldStruct.fieldHeight} 
                backgroundColor = {cfg.gameFieldStruct.backgroundColor}
            />
        </div>
    )
};
 
export default App;