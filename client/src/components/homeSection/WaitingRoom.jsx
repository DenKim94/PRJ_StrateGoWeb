import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatContext } from 'stream-chat-react';
import * as parameters from '../../game-logic/parameters.js';
import { useGameStates } from '../context/GameStatesContext.js';
import { useChannelStates } from '../context/ChannelStatesContext.js';

/**
 * React component for waiting for both players to join the game and navigating them to the game section afterward.
 * @component
 */
const WaitingRoom = () => {

    const navigate = useNavigate();
    const { channelStates } = useChannelStates();
    const { gameStates, setGameStates } = useGameStates();
    const { client } = useChatContext();

    // Synchronize states between players
    const [statesSynced, setStatesSynced] = useState(false);

    // Update states of player 2
    channelStates.channelObj.on((event) => {
        if(event.type === "game-state-sync" && event.user.id !== client.userID){

            if(parameters.genCfg.debugMode){
                console.log("######## WaitingRoom ########")
                console.log(">> event.data:", event.data)
            }

            if(event.data.isPlayer1){
                console.log(">> event.data:", event.data)

                setGameStates((prevStates) => ({
                    ...prevStates,
                    colorPlayer1: event.data.colorPlayer1,
                    colorPlayer2: event.data.colorPlayer2,
                    timePerTurn_ms: event.data.timePerTurn_ms,
                })) 
            }
        }
    })

    // State to ensure that both players joined the game
    const [connectedPlayers, setConnectedPlayers] = useState(
        channelStates.channelObj.state.watcher_count === 2
    );
    
    // Tracking changes on the channel    
    channelStates.channelObj.on("user.watching.start", (event) => {
        setConnectedPlayers(event.watcher_count === 2)
    })

    // Synchronize states between both players
    useEffect(() => {
        // Function to provide states, which shall be synchronized 
        const sendGameStateUpdates = async (gameStates) => {
            await channelStates.channelObj.sendEvent({
                type: "game-state-sync",
                data: gameStates,
            })
        };

        const syncStates = async () => {
            if (!statesSynced && connectedPlayers) {
                console.log(">> Send game states ...")
                await sendGameStateUpdates(gameStates);
    
                if(gameStates.colorPlayer1 && gameStates.colorPlayer2){
                    setStatesSynced(true);
                }
            }
        };
    
        syncStates();
    
    }, [gameStates, setGameStates, channelStates, statesSynced, connectedPlayers, setStatesSynced]);

    console.log(">> connectedPlayers:", connectedPlayers)
    console.log(">> gameStates:", gameStates)

    if(parameters.genCfg.debugMode){
        console.log("######## WaitingRoom ########")
        console.log(">> client:", client)
        console.log(">> gameStates:", gameStates)
        console.log(">> statesSynced:", statesSynced)
        console.log(">> channelStates.channelObj:", channelStates.channelObj)
    }

    useEffect(() => {
        const provideUserToGame = () => {
            if(connectedPlayers && statesSynced){
                // Navigate user to the game field
                const pathToNextPage = "/gameSection";
                navigate(pathToNextPage)
            }
        }

        provideUserToGame()
        // eslint-disable-next-line 
    }, [connectedPlayers, statesSynced])
 
    return ( 
        <div>
            {!statesSynced ? ( 
                // TO-DO: Add a Bootstrap-Component for waiting | 10.02.2024

                <div> Waiting for the opponent... </div>
            ):(
                null)
            }
        </div>
     );
}
 
export default WaitingRoom;