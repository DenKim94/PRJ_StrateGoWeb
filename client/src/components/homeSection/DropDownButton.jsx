import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useGameStates } from '../context/GameStatesContext.js';

const DropDownButton = () => {

    const { setGameStates } = useGameStates();
    
    // Update state to provide chosen color 
    const handleColorSelection = (selectedColor) => {

        // Color of player 2 depends on the chosen color by player 1
        let colorOfPlayer2 

        switch (selectedColor){
            case 'red':
                colorOfPlayer2 = 'blue';
                break;

            case 'blue':
                colorOfPlayer2 = 'red';
                break;  

            default:
                colorOfPlayer2 = '';                  
        }

        // Update gamestates
        setGameStates((prevStates) => ({        
          ...prevStates,
          colorPlayer1: selectedColor,
          colorPlayer2: colorOfPlayer2,
        }));

      };

    return ( 
        <DropdownButton
            as={ButtonGroup}
            key={'start'}
            id={'dropdown-button-drop-start'}
            drop={'start'}
            variant="secondary"
            title={'Chose your color'}
            onSelect={handleColorSelection}>

            <Dropdown.Item eventKey="red">
                <div>
                    <p style={{ color: 'red' }}> Red </p>
                </div>
            </Dropdown.Item>
            <Dropdown.Item eventKey="blue">
                <div>
                    <p style={{ color: 'rgb(21, 104, 219)' }}> Blue </p>
                </div>
            </Dropdown.Item>
        </DropdownButton>
     );
}
 
export default DropDownButton;