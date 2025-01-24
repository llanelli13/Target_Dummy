import { createContext, useContext, useState } from 'react';

const ModeContext = createContext();

export const useMode = () => useContext(ModeContext);

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState('Military'); // Default mode

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'Military' ? 'Civil' : 'Military'));
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};
