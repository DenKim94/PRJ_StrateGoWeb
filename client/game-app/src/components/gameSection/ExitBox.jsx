import React from 'react';
import * as parameters from '../../game-logic/parameters.js';

const ExitBox = ({gameStates, updateGameStates, exitBoxProps = parameters.exitBoxProps}) => {
    if(!gameStates.leaveGame){
        return
    }
    // Functions after click on buttons
    function handleConfirm(){
        console.log(">> User confirmed.")
    }
    function handleCancel(){
        console.log(">> User canceled.")
        return
    }
    return(
        <div className="exit-box">
        <p>{exitBoxProps.message}</p>
            <button onClick={handleConfirm}>Yes</button>
            <button onClick={handleCancel}>No</button>
      </div>        
    )
};
export default ExitBox