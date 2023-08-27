import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import GameField from './components/GameField';
import GameLogo from './components/GameLogo';  
import GameFigure from './components/GameFigure';
import { figProperties } from './components/parameters';

/* ******************************************************************* */ 
const App = () => {
    /**** Add game figures of player 1 ****/
    const [player1Figures, setPlayer1Figures] = useState([
        { id: 1, isActive: true },{ id: 2, isActive: true },
        { id: 3, isActive: true },{ id: 10, isActive: true },
        { id: 15, isActive: true },{ id: 19, isActive: true },
        { id: 20, isActive: true },{ id: 32, isActive: true },
        { id: 33, isActive: true },{ id: 27, isActive: true },
        { id: 34, isActive: true },{ id: 40, isActive: true },
        // ... add more figures 
      ]);
   
    /**** Add game figures of player 2 ****/  
      


    /*** Rendering the components ***/  
    return(
        <div id = "app"> 
            <GameLogo />
            <DndProvider backend={HTML5Backend}>
                <GameField />
                <div className="player-figures">
                    {player1Figures.map(figProperties => (
                        <GameFigure
                            key={figProperties.id}
                            id={figProperties.id}
                            playerColor={'red'}
                            isActive={figProperties.isActive}
                        />
                    ))}
                </div>
            </DndProvider>
        </div>       
    )
};
 
export default App;