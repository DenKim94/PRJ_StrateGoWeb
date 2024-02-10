import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStates } from '../context/GameStatesContext.js';
import { useChannelStates } from '../context/ChannelStatesContext.js';

const WaitingRoom = () => {

    const navigate = useNavigate();
    const { channelStates } = useChannelStates();
    const { gameStates, setGameStates } = useGameStates();

    // Synchronize states between players
    const [statesSynced, setStatesSynced] = useState(false);

    // Function to provide states, which shall be synchronized 
    const sendGameStateUpdates = async (gameStates) => {
        await channel.sendEvent({
            type: "game-state-sync",
            data: {gameStates},
        })
      };

    // Function get state information for syncronization
    const getGameStateUpdates = () => {

    };

    // State to ensure that both players joined the game
    const [connectedPlayers, setConnectedPlayers] = useState(
        channelStates.channelObj.state.watcher_count === 2
    );
    
    // Tracking changes on the channel    
    channelStates.channelObj.on("user.watching.start", (event) => {
        setConnectedPlayers(event.watcher_count === 2)
    })

    // TO-DO: 10.02.2024
    useEffect(() => {
        if(gameStates.isPlayer1){
            sendGameStateUpdates(gameStates);

        }else{
            getGameStateUpdates()
        }

    }, [gameStates])


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
            {!connectedPlayers ? ( 
                // TO-DO: Add a Bootstrap-Component for waiting | 10.02.2024

                <div> Waiting for the opponent... </div>
            ):(
                null)
            }
        </div>
     );
}
 
export default WaitingRoom;