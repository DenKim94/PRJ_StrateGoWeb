import React, { useState, useEffect } from "react";
import * as parameters from '../../game-logic/parameters.js';
import { useGameStates } from '../context/GameStatesContext.js';
import { useOpponentStates } from '../context/OpponentStatesContext.js';
import GameFigure from './GameFigure';
import "./FigureStorage.css";

const DefeatedFigureStorage = ({ defFigStateArray, 
                                 currentDefFig, 
                                 figStorageState,
                                 styleStorageTopic = parameters.styleStorageTopic,}) => {
    
    const { gameStates } = useGameStates();
    const { opponentStates } = useOpponentStates();  
    const [showPrevStateArray, setShowPrevStateArray] = useState(false);

    useEffect(() => {
        // Render the defeated figures after completed battle
        if(gameStates.battleModeOn && opponentStates.battleModeOn && defFigStateArray.length === 1){

            const timer = setTimeout(() => {
                setShowPrevStateArray(true); 

            }, parameters.genCfg.timeOutBattle_ms);

            // Reset timer
            return () => clearTimeout(timer);            
        }
    }, [gameStates.battleModeOn, opponentStates.battleModeOn, defFigStateArray.length]);
  
    // Early return if figure storage is not empty (during a set-up phase)
    if(figStorageState.length > 0){
        return null;

    }else{
        let sortedDefFigStateArray = defFigStateArray.slice().sort((a, b) => b.value - a.value);    

        const prevStateArray = (sortedDefFigStateArray.length > 1 && currentDefFig) ? 
                                sortedDefFigStateArray.filter(figProps => figProps.id !== currentDefFig.id) : sortedDefFigStateArray;

        console.log("@DefeatedFigureStorage - prevStateArray: ", currentDefFig)   
        console.log("@DefeatedFigureStorage - sortedDefFigStateArray: ", sortedDefFigStateArray)
        console.log("@DefeatedFigureStorage - prevStateArray: ", prevStateArray)

        return (
            <div className="figure-storage">
                <p id="storage-name" style={styleStorageTopic}>* Defeated Figures *</p>
                {(!gameStates.battleModeOn && !opponentStates.battleModeOn) ? (
                    <>  
                        <div data-bs-spy="scroll" 
                             data-bs-target="#navbar-example2" 
                             data-bs-offset="0" 
                             className="scrollspy-example" 
                             tabIndex="0">
                            {sortedDefFigStateArray.map((figProps, idx) => (
                                <div key={idx}>
                                    {/* Render each figure here, e.g., figProps.name */}
                                    <GameFigure propsObj={figProps} snapshot = {null}/>
                                </div>
                            ))}
                        </div>
                    </>
                ):(
                    (showPrevStateArray) && (
                    <div data-bs-spy="scroll" 
                        data-bs-target="#navbar-example2" 
                        data-bs-offset="0" 
                        className="scrollspy-example" 
                        tabIndex="0">
                        {prevStateArray.map((figProps, idx) => (
                            <div key={idx}>
                                {/* Render each figure here, e.g., figProps.name */}
                                <GameFigure propsObj={figProps} snapshot = {null}/>
                            </div>
                        ))}
                    </div>)
                )}
            </div>
        );
    }
};

export default DefeatedFigureStorage;