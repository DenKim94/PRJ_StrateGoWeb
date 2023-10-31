import React from 'react';
import './App.css';
import GameField from './components/GameField';
import GameLogo from './components/GameLogo';  

/* ******************************************************************* */ 
/**** Add user inputs ****/
let userSettings = {
    colorPlayer: 'blue',  // player color as placeholder [string] 
    ready2Play: false,    // state as placeholder [boolean]
};

const App = () => {
         
    /*** Rendering the components ***/  
    return(
        <div className = "App"> 
            <GameLogo />
            <GameField gameSettings = {userSettings}/> 
        </div>       
    )
};
 
export default App;