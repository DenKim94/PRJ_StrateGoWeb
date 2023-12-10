import React, {useState, useEffect}  from 'react';
import * as parameters from '../../game-logic/parameters.js';

const ExitBox = ({gameStates, updateGameStates, exitBoxProps = parameters.exitBoxProps}) => {

    const [confirmedState, setConfirmedState] = useState(gameStates.exitConfirmed)
    const [canceledState, setCanceledState] = useState(gameStates.exitCanceled)

    // Update game states after using the buttons
    function handleConfirm(){
        console.log(">> User confirmed.")
        setConfirmedState(true) 
    }   
    function handleCancel(){
        console.log(">> User canceled.")
        setCanceledState(true)   
    }

    useEffect(() => {
        const handleExit = () => {
            if(confirmedState) {
                updateGameStates((prevStates) => ({
                    ...prevStates,
                    exitConfirmed: true,
                }));
            }
            if(canceledState){
                updateGameStates((prevStates) => ({
                    ...prevStates,
                    exitCanceled: true, 
                }));                
            }
        }; 
    
        handleExit()
        }, [confirmedState, canceledState, updateGameStates])    

    return(
        <div className="exit-box" style={exitBoxProps.styleParamsBox}>
            <p style={exitBoxProps.styleParamsMessage}>{exitBoxProps.message}</p>
            <div style={exitBoxProps.styleParamsButtons}>
                <button onClick={handleConfirm} style={{borderRadius: '5px'}}> Yes </button>
                <button onClick={handleCancel} style={{borderRadius: '5px'}}> No </button>
            </div>
      </div>        
    )
};
export default ExitBox