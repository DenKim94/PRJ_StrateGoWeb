import React, { useState } from 'react';
import GameSection from '../gameSection/GameSection'; 

const WaitingRoom = ({channel}) => {

    // TO-DO: Get updated state of 'channel' from SetUP component | 04.02.2024

    console.log("channel: ", channel)
    // State to ensure that both players joined the game
    const [connectedPlayers, setConnectedPlayers] = useState(
        channel.state.watcher_count === 2
    );
    
    // Tracking changes on the channel    
    channel.on("user.watching.start", (event) => {
        setConnectedPlayers(event.watcher_count === 2)
    })

    if(!connectedPlayers){
        return <div> Waiting for the opponent... </div>
    }

    return ( 
        <div>
            <GameSection />
        </div>
     );
}
 
export default WaitingRoom;