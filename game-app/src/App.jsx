import React from 'react';
import './App.css';
import GameField from './components/GameField';
import GameLogo from './components/GameLogo';  

/* ******************************************************************* */ 
const App = () => {
    return(
        <div id = "app"> 
            <GameLogo/>
            <GameField/>
        </div>       
    )
};
 
export default App;