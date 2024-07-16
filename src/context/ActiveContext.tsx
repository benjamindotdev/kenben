import { useState, useContext, createContext } from "react";

type ActiveContextType = {
  active: string;
  setActive: (value: string) => void;
};

const activeContext = createContext<ActiveContextType | undefined>(undefined);

const ActiveProvider = ({ children }: any) => {
  const [active, setActive] = useState("");
  return (
    <activeContext.Provider value={{ active, setActive }}>
      {children}
    </activeContext.Provider>
  );
};

const useActive = () => {
  const context = useContext(activeContext);
  if (!context) {
    throw new Error("useActive must be used within an ActiveProvider");
  }
  return context;
};

export { ActiveProvider, useActive };
