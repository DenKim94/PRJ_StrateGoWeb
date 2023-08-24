import React from "react";
import { useDrag } from 'react-dnd';
import { cfgFig } from './parameters';

/* *********************** Game Figure Component ************************ */ 
const GameFigure = ({ id, image, value, isActive, color}) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'FIGURE',
        item: { id },
        collect: monitor => ({
          isDragging: monitor.isDragging(),
        }),
      });
      
};