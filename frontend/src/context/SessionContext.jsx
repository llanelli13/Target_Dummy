import { createContext, useContext, useState } from 'react';

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [userID, setUserID] = useState(null); // Ajout de l'ID utilisateur
  const [sessionData, setSessionData] = useState({}); // Pour d'autres données de session

  const startSession = () => setIsSessionOpen(true);
  const endSession = () => setIsSessionOpen(false);

  return (
    <SessionContext.Provider value={{ 
      isSessionOpen, 
      startSession, 
      endSession, 
      userID, 
      setUserID, 
      sessionData, 
      setSessionData 
    }}>
      {children}
    </SessionContext.Provider>
  );
};

