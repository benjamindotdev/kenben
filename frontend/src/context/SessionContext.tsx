import { useState, useContext, createContext, useEffect } from "react";
import axios from 'axios'
import { set } from "date-fns";

type SessionContextType = {
    loggedIn: boolean;
    setLoggedIn: (value: boolean) => void;
    logIn: (data: loginFormProps) => void;
    username: string;
    email: string;
    logOut: () => boolean;
};

type loginFormProps = {
    email: string;
    password: string;
};

const sessionContext = createContext<SessionContextType | undefined>(undefined);

const SessionProvider = ({ children }: any) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLoggedIn(true);
            console.log("logged in");
        }
    }, []);

    const logIn = async (data: loginFormProps) => {

        try {
            const response = await axios.post("http://localhost:3001/login", {
                email: data.email,
                password: data.password
            });
            localStorage.setItem("token", response.data.token);
            setUsername(response.data.username);
            setEmail(response.data.email);
            setLoggedIn(true);
        } catch (error) {
            console.error(error);
        }
    }

    const logOut = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        return true;
    };

  return (
    <sessionContext.Provider value={{ loggedIn, setLoggedIn, logIn, username, email, logOut }}>
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