import Sidebar from "./Sidebar";
import Content from "./Content";
import type { Item } from "../types/Item";
import { useState } from "react";

type MainProps = {
  toDos: Item[];
  setToDos: React.Dispatch<React.SetStateAction<Item[]>>;
  inProgress: Item[];
  setInProgress: React.Dispatch<React.SetStateAction<Item[]>>;
  done: Item[];
  setDone: React.Dispatch<React.SetStateAction<Item[]>>;
  backlog: Item[];
  setBacklog: React.Dispatch<React.SetStateAction<Item[]>>;
};

const Main: React.FC<MainProps> = ({
  toDos,
  setToDos,
  inProgress,
  setInProgress,
  done,
  setDone,
  backlog,
  setBacklog,
}) => {
  const [current, setCurrent] = useState<
    "To Do" | "In Progress" | "Done" | "Backlog" | "All"
  >("All");
  const typeCheck = (item: Item) => {
    if (current === "All") return true;
    return item.status === current;
  };
  return (
    <main className="flex flex-row h-[90vh] w-[100vw]">
      <Sidebar
        toDos={toDos}
        setToDos={setToDos}
        inProgress={inProgress}
        setInProgress={setInProgress}
        done={done}
        setDone={setDone}
        backlog={backlog}
        setBacklog={setBacklog}
        current={current}
        setCurrent={setCurrent}
      />
      <Content
        items={
          current === "To Do"
            ? toDos
            : current === "In Progress"
            ? inProgress
            : current === "Done"
            ? done
            : current === "Backlog"
            ? backlog
            : [...toDos, ...inProgress, ...done, ...backlog]
        }
        setItems={
          current === "To Do"
            ? setToDos
            : current === "In Progress"
            ? setInProgress
            : current === "Done"
            ? setDone
            : setBacklog
        }
        current={current}
      />
    </main>
  );
};

export default Main;
