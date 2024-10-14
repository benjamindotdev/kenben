import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  Dispatch,
} from "react";
import data from "../data/data.json";
import type { Item } from "../types/Item";

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

const initialState: State = {
  items: data.map((item) => ({ ...item })),
  toDos: [],
  inProgress: [],
  done: [],
  backlog: [],
};

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
