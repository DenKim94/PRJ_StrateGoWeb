import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import * as parameters from './game-logic/parameters';
import GameLogo from './components/gameSection/GameLogo';  
import HomeSection from './components/homeSection/HomeSection';
import GameSection from './components/gameSection/GameSection'; 
import ExitSection from './components/exitSection/ExitSection';  
import PageNotFound from './components/PageNotFound';
import { ButtonStatesProvider } from './components/context/ButtonStatesContext';
import { GameStatesProvider } from './components/context/GameStatesContext';

/* ******************************************************************* */ 
/** 
 * Main Component of the application "StrateGo" 
 * 
 * - Author: D.Kim 
 * - Version: 1.0.0 
 * - Date of last changes: 13.01.2024
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
                            <Route path = "/homeSection" element={ <HomeSection /> }/>
                            <Route path = "/" element={ <GameSection /> }/>
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