import { useState, useContext, createContext } from "react";

type SessionContextType = {
    loggedIn: boolean;
    setLoggedIn: (value: boolean) => void;
    logOut: () => void;
};

const sessionContext = createContext<SessionContextType | undefined>(undefined);

const SessionProvider = ({ children }: any) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const logOut = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
    };

  return (
    <sessionContext.Provider value={{ loggedIn, setLoggedIn, logOut }}>
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