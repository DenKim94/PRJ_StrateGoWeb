import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChannelStates } from '../context/ChannelStatesContext.js';

const WaitingRoom = () => {

    const navigate = useNavigate();
    const { channelStates } = useChannelStates();

    // State to ensure that both players joined the game
    const [connectedPlayers, setConnectedPlayers] = useState(
        channelStates.channelObj.state.watcher_count === 2
    );
    
    // Tracking changes on the channel    
    channelStates.channelObj.on("user.watching.start", (event) => {
        setConnectedPlayers(event.watcher_count === 2)
    })

    useEffect(() => {

        const provideUserToGame = () => {
            if(connectedPlayers){
                // Navigate user to the game field
                const pathToNextPage = "/gameSection";
                navigate(pathToNextPage)
            }
        }

        provideUserToGame()
        // eslint-disable-next-line 
    }, [connectedPlayers])
 
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