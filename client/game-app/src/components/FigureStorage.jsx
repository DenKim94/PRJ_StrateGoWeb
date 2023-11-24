import React from "react";
import GameFigure from './GameFigure';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import "./FigureStorage.css";

const FigureStorage = ({ figStateArray }) => {
    /* *** Handle Figure State Array *** */
    if(!figStateArray){
        console.warn(">> 'FigureStorage' is empty: Please check unser input object and settings of parameters!")
        return null;
    }
    return(
        <Droppable droppableId="storageZone" type = "FIGURE"> 
        {/* *** Storage of Game Figures *** */}
        {(provided) => (
            <div className="figure-storage"
            {...provided.droppableProps}
            ref={provided.innerRef}
            >
                <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" className="scrollspy-example" tabIndex="0">
                        {/* Store the draggable Figure-Components */}
                        {figStateArray.map((figProps, idx) => (
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
                                        >
                                            <GameFigure propsObj={figProps}/>
                                    </div>
                                )} 
                            </Draggable>  
                            ))}                  
                </div> 
                {provided.placeholder}                                          
            </div>
            )}                           
        </Droppable>  
    )
};

export default FigureStorage;