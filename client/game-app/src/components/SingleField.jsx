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
                                      ref={(ref) => {
                                          provided.innerRef(ref);
                                      }}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      >                           
                                      <GameFigure propsObj={figProps}/>
                                  </div>
                            )} 
              </Draggable>
          </div>
    )
};

export default SingleField;