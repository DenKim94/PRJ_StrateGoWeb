import { createContext, useContext, useState } from 'react';

const GameStatesContext = createContext();

export const GameStatesProvider = ({ children }) => {
  const [gameStates, setGameStates] = useState({
    playerName: '',           
    isCheckedIn: false,       
    opponentName: '',         
    colorPlayer: '',
    ready2Play: false,
    isPaused: false,
    leaveGame: false,
    exitConfirmed: false,
    exitCanceled: false,
    timePerTurn_ms: null,  // Time limit per turn for each player in ms
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
