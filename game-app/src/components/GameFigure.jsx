import React from "react";

/* *********************** Game Figure Component ************************ */ 
const GameFigure = ({propsObj}) => {
    
    /* If 'propsObj' is empty, the component is not goint to be rendered */
    if(!propsObj){
      return null;
    }
    /* Extract figure properties for each ID  */
    const { imgPath, value, size , figName } = propsObj;
      
    /* Set style of the component */
    const figureStyle = {
      width: `${size[0]}px`, 
      height: `${size[1]}px`,
      margin: 'auto', 
      display: 'flex',
      alignItems: 'flex-start', 
      justifyContent: 'flex-start', 
      cursor: 'grab',
      position: 'relative', 
    };

    const valueStyle = {
      fontSize: '12px', // Passen Sie die Schriftgröße an
      position: 'absolute',
      color: 'white',
      backgroundColor: 'black',
      padding: '1px 1px',
      borderRadius: '3px', 
      top: '2px', // Passe den Abstand am unteren Rand an
      left: '2px', // Passe den Abstand am rechten Rand an        
    };

    /* Return to render the component */
    return (
      <div style={figureStyle}>
        <img
          src={imgPath[0]}
          alt={"Name of the game figure: " + figName}
          style={{ width: '100%', height: '100%', borderRadius: '10%' }}
        />

        {(figName !== 'Bomb.png') && (figName !== 'Flag.png') && (figName !== 'FigureBack.png') && (
          <span style={valueStyle}>{value}</span>
        )}
    </div>
    );   
};

export default GameFigure;