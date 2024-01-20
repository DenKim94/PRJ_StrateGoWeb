import React, { useState, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Chat } from 'stream-chat-react'
import { ButtonStatesProvider } from './components/context/ButtonStatesContext';
import { GameStatesProvider } from './components/context/GameStatesContext';
import { StreamChat } from 'stream-chat' 
import Cookies from 'universal-cookie'
import './App.css';
import * as parameters from './game-logic/parameters';
import GameLogo from './components/gameSection/GameLogo';  
import HomeSection from './components/homeSection/HomeSection';
import GameSection from './components/gameSection/GameSection'; 
import ExitSection from './components/exitSection/ExitSection';  
import PageNotFound from './components/PageNotFound';
import SetUp from './components/homeSection/SetUp';

/* ******************************************************************* */ 
/** 
 * Main Component of the application "StrateGo" 
 * 
 * - Author: D.Kim 
 * - Version: 1.0.0 
 * - Date of last changes: 20.01.2024
*/
/* ******************************************************************* */ 
const App = () => {
  
    /*** Rendering the components ***/  
    return(
        <Router>
            <div className = "App" style={parameters.styleApp}> 
                <GameLogo/> 
                <ButtonStatesProvider>
                    <GameStatesProvider>                
                        <Routes>
                            <Route path = "/" element={ <HomeSection /> }/>
                            <Route path = "/setUp" element={ <SetUp /> }/>
                            <Route path = "/gameSection" element={ <GameSection /> }/>
                            <Route path = "/exitSection" element={ <ExitSection /> }/> 

                            <Route path = "*" element={ <PageNotFound />} />                    
                        </Routes>  
                    </GameStatesProvider>
                </ButtonStatesProvider>                                             
            </div> 
        </Router>      
    )
};
 
export default App;