import React, { useState } from 'react';
import GameSection from '../gameSection/GameSection'; 

const WaitingRoom = ({channel}) => {

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