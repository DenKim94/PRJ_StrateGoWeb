import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
    const cookies = useMemo(() => new Cookies(), []);
    const apiKey = process.env.REACT_APP_API_KEY; 
    const client = StreamChat.getInstance(apiKey);
    const token = cookies.get("token");

    const [userConnected, setUserConnected] = useState(false);
    const [userCreated, setUserCreated] = useState(false);

    // useEffect(() => {
    //     const maxConnectionAttempts = 3;
    //     let connectionAttemptsCount = 0;

    //     console.log(">> token: ", token);

    //     if(userCreated && token){
        
    //         const connectUser = async () => {
    //         try {
    //             const user = await client.connectUser({
    //             id: cookies.get("userID"),
    //             name: cookies.get("playerName"),
    //             playerNumber: cookies.get("playerNumber"),
    //             }, token);
        
    //             if (!userConnected) {
    //             setUserConnected(true);
    //             console.log(">> connected user: ", user);
    //             }
        
    //             connectionAttemptsCount = 0;
    //         } catch (error) {
    //             console.error("Verbindung fehlgeschlagen:", error);
        
    //             if (connectionAttemptsCount < maxConnectionAttempts) {
    //             connectionAttemptsCount += 1;
    //             connectUser();
    //             } else {
    //             console.error("Maximale Anzahl der Verbindungsversuche erreicht.");
    //             }
    //         }
    //         };
        
    //         if (!userConnected) {
    //             connectUser();
    //         }
    //     }
    //   }, [client, userConnected, cookies, userCreated, token]);
      
    const getConnection = useCallback(() => {
        // Connect each user to the stream platform
        client.connectUser({
          id: cookies.get("userID"),
          name: cookies.get("playerName"),
          playerNumber: cookies.get("playerNumber"),
        }, token ).then((user) => {
          if(!userConnected){
            setUserConnected(true)
            console.log(">> connected user: ", user) 
          }
        }); 
      }, [client, userConnected, cookies, token]);
    
      if(token && !userConnected){
        // Connect each user to the stream platform
        getConnection() 
      }  

    /*** Rendering the components ***/  
    return(
        <Router>
            <div className = "App" style={parameters.styleApp}> 
                <GameLogo/> 
                <ButtonStatesProvider>
                    <GameStatesProvider>                
                        <Routes>
                            <Route path = "/" element={ <HomeSection /> }/>
                            <Route path = "/setUp" element={ <SetUp setUserCreated = {setUserCreated} /> }/>
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