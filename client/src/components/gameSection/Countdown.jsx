import React, { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import * as parameters from '../../game-logic/parameters.js';
import { useGameStates } from '../context/GameStatesContext.js';
import { useOpponentStates } from '../context/OpponentStatesContext.js';
import { useChannelStates } from '../context/ChannelStatesContext.js';
import { useChatContext } from 'stream-chat-react';
import './Countdown.css'

const Countdown = () => {
    const { gameStates, setGameStates } = useGameStates();
    const { opponentStates, setOpponentStates } = useOpponentStates();
    const [key, setKey] = useState(0);
    const { channelStates } = useChannelStates();
    const { client } = useChatContext();

    useEffect(() => {
      if(gameStates.turnPlayer !== gameStates.playerNumber){
        setKey(prevKey => prevKey + 1);
      }  

    },[gameStates.turnPlayer, gameStates.playerNumber, gameStates.ready2Play]) 

   async function onComplete(){
        setGameStates((prevStates) => ({
            ...prevStates,
            ready2Play: false,
            timeIsOut: true,
        }))
        
       await provideGameStateUpdates({    
            ready2Play: false,
            timeIsOut: true,
        })
    };

    async function provideGameStateUpdates(updatedGameStates){
        try{
            await channelStates.channelObj.sendEvent({
                type: "time-over",
                data: updatedGameStates,
            })
        }catch(error){
            console.error(error.message);
        }
    }

    try{
        channelStates.channelObj.on((event) => {
            if(event.type === "time-over" && event.user.id !== client.userID){
    
                if(parameters.genCfg.debugMode){
                    console.log("########################################")
                    console.log("@Countdown - gameStates:", gameStates)
                    console.log("@Countdown - event.data:", event.data)
                    console.log("########################################")
                }
                
                setOpponentStates((prevStates) => ({
                    ...prevStates,
                    ready2Play: event.data.ready2Play,
                    timeIsOut: event.data.timeIsOut,
                }))                                   
            }
        })

    }catch(error){ 
        console.error(error.message);
    }

    return ( 
        <div className='countdown-container'>
            <CountdownCircleTimer
                key={key}
                isPlaying={ gameStates.playerNumber === gameStates.turnPlayer &&
                            gameStates.ready2Play && opponentStates.ready2Play && !gameStates.BattleModeOn ? true : false }
                            
                duration={gameStates.timePerTurn_ms/1000}
                colors = {["#66cdaa", "#F7B801", "#A30000"]}
                colorsTime={[gameStates.timePerTurn_ms/1000, (gameStates.timePerTurn_ms*0.5)/1000, 0]}
                onComplete={onComplete}
                size={140}
                strokeWidth={10}
            >
                {({ remainingTime }) => {
                if(remainingTime === 0) {
                    return <div style={{ fontSize: '16px', color: 'red' }}> Time is over </div>;
                } else {
                    return (
                    <div style={{ fontSize: '25px' }}>
                        {`${(Math.floor(remainingTime / 60)).toString().padStart(2, '0')}:${(remainingTime % 60).toString().padStart(2, '0')}`}
                    </div>
                    );
                }
                }}
            </CountdownCircleTimer>
        </div>    

     );
}
 
export default Countdown;