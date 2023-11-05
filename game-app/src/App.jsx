import React from 'react';
import './App.css';
import * as parameters from './components/parameters';
import GameField from './components/GameField';
import GameLogo from './components/GameLogo';  

/* ******************************************************************* */ 
/**** Add user inputs ****/
let userSettings = {
    colorPlayer: 'blue',  // player color as placeholder [string] 
    ready2Play: true,    // state as placeholder [boolean]
};

const App = () => {
         
    /*** Rendering the components ***/  
    return(
        <div className = "App"> 
            <div>
                <GameLogo /> 
            </div>
            <GameField gameFieldSettings = {parameters.gameFieldObj} gameSettings = {userSettings}/> 
        </div>       
    )
};
 
export default App;