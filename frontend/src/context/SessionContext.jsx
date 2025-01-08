import { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [isSessionOpen, setIsSessionOpen] = useState(false);

  const startSession = () => {
    setIsSessionOpen(true);
  };

  const endSession = () => {
    setIsSessionOpen(false);
  };

  return (
    <SessionContext.Provider value={{ isSessionOpen, startSession, endSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
