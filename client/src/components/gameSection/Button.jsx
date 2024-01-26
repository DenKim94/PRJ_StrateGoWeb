import React from 'react';
import './Buttons.css'

function Button({buttonName, isDisabled, onCklickFunction}){

    const buttonStyle = {
        marginTop: '10px',
        border: '1px solid black',
        textAlign: 'center',
        fontSize:'15px',
      };

    return ( 
        <button style = {buttonStyle} 
                type="button" 
                id = "#highlighted-button" 
                className="btn btn-warning" 
                onClick={onCklickFunction}
                disabled = {isDisabled}>

            {buttonName}
        </button> 
    );
}
export default Button
