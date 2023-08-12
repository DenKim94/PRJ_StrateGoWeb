import React from 'react';
import './GameField.css'
import YAxis from './yAxis';
import XAxis from './xAxis';

class GameField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayFigures: [], // Array, um Spielfiguren hinzuzufügen
    };
  }

  render() {
    const {fieldWidth, fieldHeight, backgroundColor} = this.props;
    const sizeSingleField = Math.abs(fieldWidth)/10;
    const fieldStyle = {
      width: fieldWidth,
      height: fieldHeight,
      backgroundColor: backgroundColor, // Hintergrundfarbe des Spielfeldes
      border: '1px solid black', // Schwarze Linie um das Spielfeld
      display: 'grid',
      // Aufteilung des Spielfeldes in einzelne Quadrate
      gridTemplateColumns: `repeat(10, ${sizeSingleField}px)`,
      gridTemplateRows: `repeat(10, ${sizeSingleField}px)`,
    };

    const styleSingleField = {
      width: sizeSingleField,
      height: sizeSingleField,
      border: '1px solid black', // Schwarze Linien um jedes Spielfeldquadrat
    };

    // Erstelle ein String-Array aus Buchstaben für die x-Achse
    const xAxisLetters = Array.from({ length: 10 }, (_, index) =>
      String.fromCharCode(65 + index)
    );

    // Erstelle ein String-Array aus Zahlen für die y-Achse
    const yAxisNumbers = (Array.from({ length: 10 }, (_, index) => 
    String(index + 1))).reverse();
    
    return (
        <div className="game-field-container">
          {/* y-Achse */}
          <div>
              <YAxis yAxisArray = {yAxisNumbers} axisHeight = {fieldHeight}/>
          </div>
          {/* *** Das Spielfeld *** */}
          <div className="game-field" style={fieldStyle}>
            {/* Hier werden die Spielfelder erstellt */}
            {Array.from({ length: 100 }).map((_, index) => (
              <div key={index} className="single-field" style={styleSingleField}>
              </div>
            ))}
          </div>
          {/* x-Achse */}         
          <div>           
              <XAxis xAxisArray = {xAxisLetters} singleFieldWidth = {sizeSingleField} />
          </div> 
        </div>
      );
  }
}

// Vorgabe für die Spielfeldbreite und -höhe, falls nicht über 'props' definiert
GameField.defaultProps = {
    fieldWidth: 500,
    fieldHeight: 500,
    backgroundColor: 'lightgoldenrodyellow'
  };

export default GameField;
