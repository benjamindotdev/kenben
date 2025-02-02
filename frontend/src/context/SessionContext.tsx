import { useState, useContext, createContext, useEffect } from "react";
import axios from 'axios'

type SessionContextType = {
    loggedIn: boolean;
    setLoggedIn: (value: boolean) => void;
    logIn: (data: loginFormProps) => Promise<{ username: string, email: string }>;
    email: string;
    editEmail: (newEmail: string) => Promise<boolean>;
    username: string;
    editUsername: (newUsername: string) => Promise<boolean>;
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

    useEffect(() => {
        console.log("Logged in: ", loggedIn);
    }, [loggedIn]);

    useEffect(() => {
      console.log("Username:",username);
  }, [username]);

  useEffect(() => {
      console.log("Email:",email);
  }, [email]);

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
            return { username: response.data.username, email: response.data.email };
        } catch (error) {
            console.log(error);
            return { username: "", email: "" };
        }
    }

    const editEmail = async (newEmail: string) => {
      try {
          const response = await axios.put(`http://localhost:3001/${username}/email`, {
          email: newEmail
      });
      setEmail(newEmail);
      return true;
      } catch (error) {
          console.log(error);
          return false;
      }
  }

  const editUsername = async (newUsername: string) => {
    try {
        const response = await axios.put(`http://localhost:3001/${username}/username`, {
        username: newUsername
    });
    setUsername(newUsername);
    return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

  const logOut = () => {
    localStorage.removeItem("token");
    setUsername("");
    setEmail("");
    setLoggedIn(false);
    return true;
};

  return (
    <sessionContext.Provider value={{ loggedIn, setLoggedIn, logIn, email, editEmail, username, editUsername, logOut }}>
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