import { createContext, useContext, useState } from 'react';

const ChannelStatesContext = createContext();

export const ChannelStatesProvider = ({ children }) => {
  const [channelStates, setChannelStates] = useState({
    channelObj: null,
  });

  return (
    <ChannelStatesContext.Provider value={{ channelStates, setChannelStates }}>
      {children}
    </ChannelStatesContext.Provider>
  );
};

export const useChannelStates = () => {
  return useContext(ChannelStatesContext);
};
