import React from 'react';
import './App.css';
import GameField from './components/GameField';
import GameLogo from './components/GameLogo';  

/* ******************************************************************* */ 
const App = () => {
    /**** Add game figures of player 1 ****/
    // const player1Figures = [
    //     { id: 1, isActive: true },{ id: 2, isActive: true },
    //     { id: 3, isActive: true },{ id: 10, isActive: true },
    //     { id: 15, isActive: true },{ id: 19, isActive: true },
    //     { id: 20, isActive: true },{ id: 32, isActive: true },
    //     { id: 33, isActive: true },{ id: 27, isActive: true },
    //     { id: 34, isActive: true },{ id: 40, isActive: true },
    //     // ... add more figures 
    //   ];
         
    /*** Rendering the components ***/  
    return(
        <div className = "App"> 
            <GameLogo />
            <GameField /> 
        </div>       
    )
};
 
export default App;