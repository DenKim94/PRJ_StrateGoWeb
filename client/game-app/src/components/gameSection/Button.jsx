import React from 'react';
import './Button.css'

function Button({buttonName, onCklickFunction}){
    // To-Do: Add style and set position of the Button  
    const buttonStyle = {
        marginTop: '8px',
        border: '1px solid black',
        textAlign: 'center',
        fontSize:'15px',
      };
    return ( 
        <button style = {buttonStyle} type="button" className="btn btn-warning" onClick={onCklickFunction}>
            {buttonName}
        </button> 
    );
}
export default Button
