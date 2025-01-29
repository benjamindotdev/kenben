import { useState, useContext, createContext } from "react";

type SessionContextType = {
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
};

const sessionContext = createContext<SessionContextType | undefined>(undefined);

const SessionProvider = ({ children }: any) => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <sessionContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </sessionContext.Provider>
  );
};

const useSession = () => {
  const context = useContext(sessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export { SessionProvider, useSession };