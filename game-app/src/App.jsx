import React, { useState } from 'react';
import './App.css';
import GameField from './components/GameField';
import GameLogo from './components/GameLogo';  
import GameFigure from './components/GameFigure';
import { figProperties } from './components/parameters';

/* ******************************************************************* */ 
const App = () => {

    const [player1Figures, setPlayer1Figures] = useState([
        { id: 1, isActive: true },
        { id: 2, isActive: true },
        { id: 3, isActive: true },
        // ... add figures for player 1
      ]);
    
      
    /*** Rendering the components ***/  
    return(
        <div id = "app"> 
            <GameLogo/>
            <GameField/>
            <div className="player-figures">
                {player1Figures.map(figProperties => (
                <GameFigure
                    key={figProperties.id}
                    id={figProperties.id}
                    playerColor={'red'}
                    isActive={true}
                />
                ))}
            </div>
        </div>       
    )
};
 
export default App;