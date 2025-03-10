import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  Dispatch,
} from "react";
import axios from "axios";
import type { Item } from "../types/Item";
import { useSession } from "./SessionContext";

interface ItemsContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

interface State {
  items: Item[];
  toDos: Item[];
  inProgress: Item[];
  done: Item[];
  backlog: Item[];
}

type Action =
  | { type: "SET_ITEMS"; payload: Item[] }
  | { type: "SET_TODOS"; payload: Item[] }
  | { type: "SET_IN_PROGRESS"; payload: Item[] }
  | { type: "SET_DONE"; payload: Item[] }
  | { type: "SET_BACKLOG"; payload: Item[] };

//const { username } = useSession();
const username = "test";
const token = localStorage.getItem("token") || "example";
const port = import.meta.env.VITE_SERVER_PORT || 3001;

console.log(username);
console.log(token);

  const data = await axios.get(`http://localhost:${port}/${username}`,
    {
      headers:
        {
          Authorization: `Bearer ${token}`,
          'Allow-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Allow-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Allow-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Origin': '*',
        },
    }
  ).then((res) => res.data);
  console.log(data);

  const initialState: State = {
    items: data !== null ? data.map((item: any) => ({ ...item })) : [],
    toDos: [],
    inProgress: [],
    done: [],
    backlog: [],
  };

  const handleCreateItem = async (item: Item) => {
    const data = await axios.post(`http://localhost:${port}/${username}`, { item },
      {
        headers:
          {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Allow-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Allow-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Allow-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Origin': '*',
          },
      }
    ).then((res) => res.data);
    return data;
  }

  const handleEditItem = async (item: Item) => {
    const data = await axios.put(`http://localhost:${port}/${username}`, { item },
      {
        headers:
          {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Allow-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Allow-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Allow-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Origin': '*',
          },
      }
    ).then((res) => res.data);
    return data;
  }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload };
    case "SET_TODOS":
      return { ...state, toDos: action.payload };
    case "SET_IN_PROGRESS":
      return { ...state, inProgress: action.payload };
    case "SET_DONE":
      return { ...state, done: action.payload };
    case "SET_BACKLOG":
      return { ...state, backlog: action.payload };
    default:
      return state;
  }
};

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

const ItemsProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: "SET_TODOS",
      payload: state.items.filter((item) => item.status === "To Do"),
    });
    dispatch({
      type: "SET_IN_PROGRESS",
      payload: state.items.filter((item) => item.status === "In Progress"),
    });
    dispatch({
      type: "SET_DONE",
      payload: state.items.filter((item) => item.status === "Done"),
    });
    dispatch({
      type: "SET_BACKLOG",
      payload: state.items.filter((item) => item.status === "Backlog"),
    });
  }, [state.items]);

  return (
    <ItemsContext.Provider value={{ state, dispatch }}>
      {children}
    </ItemsContext.Provider>
  );
};

const useItems = () => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItems must be used within an ItemsProvider");
  }
  return context;
};

export { ItemsProvider, useItems };
