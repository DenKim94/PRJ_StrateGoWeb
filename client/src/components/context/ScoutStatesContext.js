import { createContext, useContext, useState } from 'react';

const ScoutStatesContext = createContext();

export const ScoutStatesProvider = ({ children }) => {
  const [scoutStates, setScoutStates] = useState({
    isDraggedOverFigure: false,
    isValidMove: true,
  });

  return (
    <ScoutStatesContext.Provider value={{ scoutStates, setScoutStates }}>
      {children}
    </ScoutStatesContext.Provider>
  );
};

export const useScoutStates = () => {
  return useContext(ScoutStatesContext);
};
