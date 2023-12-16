import React, {useState, useEffect}  from 'react';
import { useNavigate } from 'react-router-dom';
import * as parameters from '../../game-logic/parameters.js';

const ExitBox = ({gameStates, updateGameStates, exitBoxProps = parameters.exitBoxProps}) => {

    const [confirmedState, setConfirmedState] = useState(gameStates.exitConfirmed)
    const [canceledState, setCanceledState] = useState(gameStates.exitCanceled)
    const navigate = useNavigate();

    // Update game states after using the buttons
    function handleConfirm(){
        setConfirmedState(true) 
    }   
    function handleCancel(){
        setCanceledState(true)   
    }

    useEffect(() => {
        const handleExit = () => {
            if(confirmedState) {
                updateGameStates((prevStates) => ({
                    ...prevStates,
                    exitConfirmed: true,
                }));
                navigate("/exitSection")
            }
            if(canceledState){
                updateGameStates((prevStates) => ({
                    ...prevStates,
                    exitCanceled: true, 
                }));                
            }
        }; 
    
        handleExit()
        }, [confirmedState, canceledState, updateGameStates, navigate])    

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