import React from 'react';
import './GameField.css'

class GameField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayFigures: [], // Array, um Spielfiguren hinzuzufügen
    };
  }

  render() {
    const {fieldWidth, fieldHeight, backgroundColor} = this.props;
    const sizeSingleField = fieldWidth / 10;
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

    // Erstelle ein Array von Buchstaben für die x-Achse
    const xAxisLetters = Array.from({ length: 10 }, (_, index) =>
      String.fromCharCode(65 + index)
    );
    
    // Erstelle ein Array von Zahlen für die y-Achse
    const yAxisNumbers = Array.from({ length: 10 }, (_, index) => index + 1);

    return (
        <div className="game-field-container">
          {/* y-Achse */}
          <div className="y-axis">
            {yAxisNumbers.map((number, index) => (
              <div key={index}>{number}</div>
            ))}
          </div>
  
          {/* Das Spielfeld */}
          <div className="game-field" style={fieldStyle}>
            {/* Hier werden die Spielfelder und Spielfiguren dargestellt */}
            {Array.from({ length: 100 }).map((_, index) => (
              <div key={index} className="single-field" style={styleSingleField}>
                {/* Hier können Spielfiguren platziert werden */}
                {this.state.arrayFigures.map((figur, figurIndex) => (
                  <div
                    key={figurIndex}
                    style={{
                      width: sizeSingleField,
                      height: sizeSingleField,
                      backgroundColor: 'blue', // Beispielhafte Farbe für Spielfiguren
                      borderRadius: '50%',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
  
          {/* x-Achse */}
          <div className="x-axis">
            {xAxisLetters.map((letter, index) => (
              <div key={index}>{letter}</div>
            ))}
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
