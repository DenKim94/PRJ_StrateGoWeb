import { createContext, useContext, useState } from 'react';

const ConnectionStatesContext = createContext();

export const ConnectionStatesProvider = ({ children }) => {
  const [conncectionStates, setConnectionStates] = useState({
    channelObj: null,
  });

  return (
    <ConnectionStatesContext.Provider value={{ conncectionStates, setConnectionStates }}>
      {children}
    </ConnectionStatesContext.Provider>
  );
};

export const useConnectionStates = () => {
  return useContext(ConnectionStatesContext);
};
