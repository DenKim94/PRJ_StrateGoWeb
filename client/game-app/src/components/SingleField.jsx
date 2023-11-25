import React from 'react';
import GameFigure from './GameFigure';
import { Draggable } from 'react-beautiful-dnd';

const SingleField = ({fieldState, idx}) => {

  const figProps = fieldState.figure; 
  const emptyFigProps = !figProps; 

  // Set style of the component 
  const fieldStyle = {
    alignItems: 'center', 
    justifyContent: 'center', 
  };

  // If empty field, return the function
  if(emptyFigProps){
    return null;
  }
  // Disable animation translate except element is dragging
  function getStyle(style, snapshot) {
    if (!snapshot.isDragging) return {};
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,
      // cannot be 0, but make it super tiny
      transitionDuration: `0.001s`,
    };
  }

  // Render the game figure on the game field
    return(
          <div style={fieldStyle}>
              {/* Add draggable game figure component here, if 'fieldState' is not empty */}
              <Draggable draggableId={`${figProps.color}_${figProps.id}`}
                          key= {`${figProps.color}_${figProps.id}`} 
                          index={idx} 
                          type = "FIGURE"
                          >
                            {(provided,snapshot)=>(
                                  <div className='game-figure'
                                      ref={provided.innerRef} 
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={getStyle(provided.draggableProps.style, snapshot)}
                                      >                           
                                      <GameFigure propsObj={figProps}/>
                                  </div>
                            )} 
              </Draggable>
          </div>
    )
};

export default SingleField;