import React from 'react';
import GameFigure from './GameFigure';
import { Draggable } from 'react-beautiful-dnd';

const SingleField = ({fieldState}) => {

  const figProps = fieldState.figure; 
  const emptyFigProps = !figProps; 

  if(emptyFigProps){
    return null;
  }

    return(
          <div>
              {/* Add draggable game figure component here, if 'fieldState' is not empty */}
              <Draggable draggableId={figProps.id} 
                          key= {figProps.id} 
                          index={figProps.value} 
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