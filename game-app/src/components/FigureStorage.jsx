import React from "react";
import GameFigure from './GameFigure';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import "./FigureStorage.css";

const FigureStorage = ({ figStateArray }) => {
    /* *** Handle Figure State Array *** */

    return(
        <Droppable droppableId="storageZone" type = "FIGURE"> 
        {/* *** Storage of Game Figures *** */}
        {(provided) => (
            <div className="figure-storage"
            {...provided.droppableProps}
            ref={provided.innerRef}
            >
                <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-offset="0" class="scrollspy-example" tabindex="0">
                    <h4 id="scrollspyHeading1">First heading</h4>
                    <p>...</p>
                    <h4 id="scrollspyHeading2">Second heading</h4>
                    <p>...</p>
                    <h4 id="scrollspyHeading3">Third heading</h4>
                    <p>...</p>
                    <h4 id="scrollspyHeading4">Fourth heading</h4>
                    <p>...</p>
                    <h4 id="scrollspyHeading5">Fifth heading</h4>
                    <p>...</p>
                </div> 
                {provided.placeholder}                                          
            </div>
            )}                           
        </Droppable>  
    )
};

export default FigureStorage;