import React, { useState, useEffect }  from 'react';
import * as parameters from '../../game-logic/parameters.js';
import { useGameStates } from '../context/GameStatesContext.js';
import { useOpponentStates } from '../context/OpponentStatesContext.js';
import CardOpponent from './CardOpponent.jsx'
import CardPlayer from './CardPlayer.jsx'

const DuellCards = ({ playerFigProps, opponentFigProps, props = parameters.DuellCardProps }) => {

    const { opponentStates, setOpponentStates } = useOpponentStates();
    const { gameStates, setGameStates }         = useGameStates();

    const [revealed, setRevealed] = useState(false);
  
    useEffect(() => {
        const revealTimeout = setTimeout(() => { setRevealed(true); }, props.revealDelay_ms);
        return () => clearTimeout(revealTimeout);

    }, [props.revealDelay_ms]);

     useEffect(() => {
        setTimeout(() => {
            if(gameStates.BattleModeOn || opponentStates.BattleModeOn){
                // Reset states
                setGameStates((prevStates) => ({ 
                    ...prevStates,
                    BattleModeOn: false,
                }));
            
                setOpponentStates((prevStates) => ({
                    ...prevStates,
                    BattleModeOn: false,
                })); 
            }
        }, parameters.genCfg.timeOutBattle_ms);

        // eslint-disable-next-line
    }, [])   

    return( 
        <div style={props.style}>
            <CardOpponent opponentFigProps = {opponentFigProps} revealed = {revealed}/>
            <CardPlayer playerFigProps = {playerFigProps} revealed = {revealed}/>
        </div> 
    );
}
 
export default DuellCards;

