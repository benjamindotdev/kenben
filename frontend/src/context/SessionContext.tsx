import { useState, useContext, createContext, useEffect } from "react";
import axios from 'axios'

type SessionContextType = {
    loggedIn: boolean;
    setLoggedIn: (value: boolean) => void;
    logIn: (data: loginFormProps) => void;
    username: string;
    logOut: () => void;
};

type loginFormProps = {
    email: string;
    username: string;
    password: string;
};

const sessionContext = createContext<SessionContextType | undefined>(undefined);

const SessionProvider = ({ children }: any) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLoggedIn(true);
            console.log("logged in");
        }
    }, []);

    const logIn = async (data: loginFormProps) => {

        try {
            const response = await axios.post("http://localhost:3001/login", data);
            localStorage.setItem("token", response.data.token);
            setUsername(response.data.username);
            setLoggedIn(true);
        } catch (error) {
            console.error(error);
        }
    }

    const logOut = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
    };

  return (
    <sessionContext.Provider value={{ loggedIn, setLoggedIn, logIn, username, logOut }}>
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