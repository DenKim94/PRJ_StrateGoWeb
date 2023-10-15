import React from 'react';
import './App.css';
import GameField from './components/GameField';
import GameLogo from './components/GameLogo';  

/* ******************************************************************* */ 
const App = () => {
    /**** Add user inputs ****/
    const colorPlayer = 'red';
         
    /*** Rendering the components ***/  
    return(
        <div className = "App"> 
            <GameLogo />
            <GameField colorPlayer = {colorPlayer}/> 
        </div>       
    )
};
 
export default App;