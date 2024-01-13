import { createContext, useContext, useState } from 'react';

const GameStatesContext = createContext();

export const GameStatesProvider = ({ children }) => {
  const [gameStates, setGameStates] = useState({
    colorPlayer1: 'blue',
    isPlayer1: true,
    ready2Play: false,
    isPaused: false,
    leaveGame: false,
    exitConfirmed: false,
    exitCanceled: false,
  });

  return (
    <GameStatesContext.Provider value={{ gameStates, setGameStates }}>
      {children}
    </GameStatesContext.Provider>
  );
};

export const useGameStates = () => {
  return useContext(GameStatesContext);
};
