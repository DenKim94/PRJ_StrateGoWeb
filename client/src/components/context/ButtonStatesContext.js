import { createContext, useContext, useState } from 'react';

const ButtonStatesContext = createContext();

export const ButtonStatesProvider = ({ children }) => {
  const [buttonStates, setButtonStates] = useState({
    pauseButtonText: "Pause Game",
    startButtonText: "Start Game",
    exitButtonText: "Exit Game",
    disabledStartButton: true,
    counterUsedStartButton: 0,
  });

  return (
    <ButtonStatesContext.Provider value={{ buttonStates, setButtonStates }}>
      {children}
    </ButtonStatesContext.Provider>
  );
};

export const useButtonStates = () => {
  return useContext(ButtonStatesContext);
};

