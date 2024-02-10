import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useGameStates } from '../context/GameStatesContext.js';

const DropDownButton = () => {

    const { setGameStates } = useGameStates();
    
    // Update state to provide chosen color 
    const handleColorSelection = (selectedColor) => {
        setGameStates((prevStates) => ({        
          ...prevStates,
          colorPlayer: selectedColor,
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
        onSelect={handleColorSelection}
        >
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