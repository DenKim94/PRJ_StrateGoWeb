import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Chat } from 'stream-chat-react'
import { ButtonStatesProvider } from './components/context/ButtonStatesContext';
import { GameStatesProvider } from './components/context/GameStatesContext';
import { ChannelStatesProvider } from './components/context/ChannelStatesContext';
import { StreamChat } from 'stream-chat' 
import Cookies from 'universal-cookie'
import './App.css';
import * as parameters from './game-logic/parameters';
import GameLogo from './components/gameSection/GameLogo';  
import HomeSection from './components/homeSection/HomeSection';
import WaitingRoom from './components/homeSection/WaitingRoom';
import GameSection from './components/gameSection/GameSection';
import ExitSection from './components/exitSection/ExitSection';  
import PageNotFound from './components/PageNotFound';
import SetUp from './components/homeSection/SetUp';

// ******************************************************************* 
/** 
 * Main component of the application "StrateGo" 
 * 
 * - Developer: D.Kim 
 * - Version: 1.0.0 
 * - Date of last changes: 11.02.2024
*/
// *******************************************************************  
const App = () => {
    const cookies = useMemo(() => new Cookies(), []);
    const apiKey = process.env.REACT_APP_API_KEY; 
    // Client side authentication to the Chat-API with a valid key
    const client = StreamChat.getInstance(apiKey); 
    const [userConnected, setUserConnected] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [tokenRef, setTokenRef] = useState(null);


    useEffect(() => {
        const maxConnectionAttempts = parameters.genCfg.maxConnectionAttempts;
        let connectionAttemptsCounter = 0;

        if(userCreated && tokenRef){
            // Connect the user to the Chat-API/Platform with a valid token
            const connectUser = async () => {
                try {

                    const user = await client.connectUser({
                        id: cookies.get("userID"),
                        name: cookies.get("playerName"),
                        playerNumber: cookies.get("playerNumber"),
                    }, tokenRef);
            
                    if (!userConnected) {
                        setUserConnected(true);
                        console.log(">> Connected user: ", user);
                    }
                    connectionAttemptsCounter = 0;

                } catch (error) {
                    console.error(">> Connection failed:", error);

                    // Try to reconnect the user if maximum attempts currently not exceeded
                    if (connectionAttemptsCounter <= maxConnectionAttempts) {
                        connectionAttemptsCounter += 1;
                        connectUser();

                    } else {
                        console.error(">> Connect user: Maximum number of attempts exceeded.");
                    }
                }
            };       
            if(!userConnected){
                connectUser();
            }
        }
        }, [client, userConnected, cookies, userCreated, tokenRef]);

        if(parameters.genCfg.debugMode){
            console.log(">> App: tokenRef: ", tokenRef);
            console.log(">> App: cookies: ", cookies);
            console.log("> App: userConnected: ", userConnected)
            console.log("> App: userCreated: ", userCreated)
        }

        /*** Rendering the components ***/  
        return(
            <Router>
                <div className = "App" style={parameters.styleApp}> 
                    <GameLogo/> 
                    <ButtonStatesProvider>
                        <GameStatesProvider>  
                            <ChannelStatesProvider>
                                <Chat client={client}>              
                                    <Routes>
                                        <Route path = "/" element={ <HomeSection /> }/>
                                        <Route path = "/setUp/*" element={ <SetUp setToken = {setTokenRef} 
                                                                                  userCreated = {userCreated} 
                                                                                  setUserCreated = {setUserCreated} 
                                                                                  setUserConnected = {setUserConnected}/>}/>
                                                                                  
                                        <Route path = "/waitingRoom" element={ <WaitingRoom /> }/>
                                        <Route path = "/gameSection" element={ <GameSection /> }/>
                                        <Route path = "/exitSection" element={ <ExitSection /> }/> 

                                        <Route path = "*" element={ <PageNotFound />} />                    
                                    </Routes> 
                                </Chat> 
                            </ChannelStatesProvider>    
                        </GameStatesProvider>
                    </ButtonStatesProvider>                                             
                </div> 
            </Router>      
        )
};
 
export default App;