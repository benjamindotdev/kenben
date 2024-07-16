import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import data from "../data/data.json";
import type { Item } from "../types/Item";

interface ItemsContextType {
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
  toDos: Item[];
  setToDos: Dispatch<SetStateAction<Item[]>>;
  inProgress: Item[];
  setInProgress: Dispatch<SetStateAction<Item[]>>;
  done: Item[];
  setDone: Dispatch<SetStateAction<Item[]>>;
  backlog: Item[];
  setBacklog: Dispatch<SetStateAction<Item[]>>;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

const ItemsProvider = ({ children }: any) => {
  const [items, setItems] = useState(
    data.map((item) => {
      return {
        ...item,
        createdDate: new Date(item.createdDate).toLocaleDateString(),
        dueDate: new Date(item.dueDate).toLocaleDateString(),
      };
    })
  );

  const [toDos, setToDos] = useState<Item[]>([]);
  const [inProgress, setInProgress] = useState<Item[]>([]);
  const [done, setDone] = useState<Item[]>([]);
  const [backlog, setBacklog] = useState<Item[]>([]);
  useEffect(() => {
    setToDos(items.filter((item) => item.status === "To Do"));
    setInProgress(items.filter((item) => item.status === "In Progress"));
    setDone(items.filter((item) => item.status === "Done"));
    setBacklog(items.filter((item) => item.status === "Backlog"));
  }, [items]);

  return (
    <ItemsContext.Provider
      value={{
        items,
        setItems,
        toDos,
        setToDos,
        inProgress,
        setInProgress,
        done,
        setDone,
        backlog,
        setBacklog,
      }}
    >
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
